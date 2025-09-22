/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable no-bitwise */
import { inject, Injectable, signal } from '@angular/core';
import type { Comment } from '@shared/model/comment.model';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { CommentsClient } from 'src/app/api/comments-api.service';

@Injectable({ providedIn: 'root' })
export class CommentsService {
  private commentsClient = inject(CommentsClient);
  private comments = signal<Comment[]>([]);

  loadedComments = this.comments.asReadonly();

  getComments(): Observable<Comment[]> {
    return this.commentsClient
      .getComments()
      .pipe(
        catchError(error => {
          // TODO: Logging
          // eslint-disable-next-line no-console
          console.error('Error fetching comments:', error);
          return throwError(
            () => new Error('Something went wrong fetching comments data')
          );
        })
      )
      .pipe(tap(comments => this.comments.set(comments)));
  }

  getComment(id: string): Observable<Comment> {
    return this.commentsClient.getComment(id).pipe(
      catchError(error => {
        // TODO: Logging
        // eslint-disable-next-line no-console
        console.error('Error fetching comment:', error);
        return throwError(
          () => new Error('Something went wrong fetching comment data')
        );
      })
    );
  }

  addComment(title: string, description: string): Observable<Comment> {
    return this.commentsClient
      .addComment(title, description)
      .pipe(
        catchError(error => {
          // TODO: Logging
          // eslint-disable-next-line no-console
          console.error('Error adding comment:', error);
          return throwError(
            () => new Error('Something went wrong while adding new comment')
          );
        })
      )
      .pipe(
        tap(comment => {
          this.comments.update(comments =>
            comments ? [...comments, comment] : [comment]
          );
        })
      );
  }

  updateComment(
    id: string,
    title: string,
    description: string
  ): Observable<void> {
    return this.commentsClient
      .updateComment(id, title, description)
      .pipe(
        catchError(error => {
          // TODO: Logging
          // eslint-disable-next-line no-console
          console.error('Error updating comment:', error);
          return throwError(
            () => new Error('Something went wrong while updating comment')
          );
        })
      ) // eagerly update the local state
      .pipe(
        tap(() => {
          this.comments.update(comments => {
            const index = comments.findIndex(c => c.id === id);
            if (index !== -1) {
              const updatedComments = [...comments];
              updatedComments[index] = {
                ...updatedComments[index],
                title,
                description,
                editedOn: new Date().toISOString()
              };
              return updatedComments;
            }
            return comments;
          });
        })
      );
  }

  deleteComment(id: string): Observable<void> {
    return this.commentsClient
      .deleteComment(id)
      .pipe(
        catchError(error => {
          // TODO: Logging
          // eslint-disable-next-line no-console
          console.error('Error deleting comment:', error);
          return throwError(
            () => new Error('Something went wrong while deleting comment')
          );
        })
      ) // eagerly update the local state
      .pipe(
        tap(() => {
          this.comments.update(comments =>
            comments.filter(c => c.id !== id)
          );
        })
      );
  }
}
