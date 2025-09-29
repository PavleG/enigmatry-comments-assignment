/* eslint-disable @typescript-eslint/no-magic-numbers */
import { inject, Injectable, signal } from '@angular/core';
import type { Comment } from '@shared/model/comment.model';
import { PagedResult } from '@shared/model/paged-result.model';
import {
  catchError,
  map,
  Observable,
  switchMap,
  tap,
  throwError,
  ignoreElements
} from 'rxjs';
import { CommentsClient } from 'src/app/api/comments-api.service';

@Injectable({ providedIn: 'root' })
export class CommentsService {
  private commentsClient = inject(CommentsClient);

  private comments = signal<Comment[]>([]);
  private totalComments = signal<number>(0);

  private currentPage = signal(0);
  private currentSize = signal(5);
  private currentSearch = signal<string | undefined>(undefined);

  readonly loadedComments = this.comments.asReadonly();
  readonly totalLoadedComments = this.totalComments.asReadonly();
  readonly pageIndex = this.currentPage.asReadonly();
  readonly pageSize = this.currentSize.asReadonly();

  getComment(id: string): Observable<Comment> {
    return this.commentsClient
      .getComment(id)
      .pipe(catchError(this.handleError<Comment>('fetching comment')));
  }

  addComment(title: string, description: string): Observable<Comment> {
    return this.commentsClient.addComment(title, description).pipe(
      switchMap(comment => this.loadFirstPage().pipe(map(() => comment))),
      catchError(this.handleError<Comment>('adding comment'))
    );
  }

  updateComment(
    id: string,
    title: string,
    description: string
  ): Observable<void> {
    return this.commentsClient.updateComment(id, title, description).pipe(
      switchMap(() => this.reloadCurrentPage().pipe(ignoreElements())),
      catchError(this.handleError<void>('updating comment'))
    );
  }

  deleteComment(id: string): Observable<void> {
    return this.commentsClient.deleteComment(id).pipe(
      switchMap(() => {
        const totalPagesAfterDelete = Math.ceil(
          (this.totalComments() - 1) / this.currentSize()
        );
        const newPage = Math.min(this.currentPage(), totalPagesAfterDelete - 1);
        this.currentPage.set(newPage >= 0 ? newPage : 0);

        return this.reloadCurrentPage().pipe(ignoreElements());
      }),
      catchError(this.handleError<void>('deleting comment'))
    );
  }

  loadFirstPage(): Observable<PagedResult<Comment>> {
    return this.getComments(0, this.currentSize(), this.currentSearch());
  }

  loadPage(page: number, size: number): Observable<PagedResult<Comment>> {
    return this.getComments(page, size, this.currentSearch());
  }

  search(searchTerm: string): Observable<PagedResult<Comment>> {
    return this.getComments(0, this.currentSize(), searchTerm);
  }

  reloadCurrentPage(): Observable<PagedResult<Comment>> {
    return this.getComments(
      this.currentPage(),
      this.currentSize(),
      this.currentSearch()
    );
  }

  private handleError<T>(context: string): (error: unknown) => Observable<T> {
    return (error: unknown): Observable<T> => {
      if (error instanceof Error) {
        // TODO: Log the error
        // eslint-disable-next-line no-console
        console.error(`Error in ${context}:`, error.message);
      } else {
        // TODO: Log the error
        // eslint-disable-next-line no-console
        console.error(`Error in ${context}:`, error);
      }
      return throwError(
        // TODO: Translate the error message
        () => new Error(`Something went wrong ${context.toLowerCase()}`)
      );
    };
  }

  private getComments(
    page = 0,
    size = 5,
    search?: string
  ): Observable<PagedResult<Comment>> {
    return this.commentsClient.getComments(page, size, search).pipe(
      tap(pagedResult => {
        this.comments.set(pagedResult.items);
        this.totalComments.set(pagedResult.totalElements);
        this.currentPage.set(page);
        this.currentSize.set(size);
        this.currentSearch.set(search);
      }),
      catchError(this.handleError<PagedResult<Comment>>('fetching comments'))
    );
  }
}
