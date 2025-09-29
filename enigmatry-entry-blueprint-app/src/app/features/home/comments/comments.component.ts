import { Component, DestroyRef, OnInit, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorService } from '@app/services/error.service';
import { PageEvent } from '@enigmatry/entry-components';
import { MaterialModule } from '@shared/material.module';
import { CommentComponent } from './comment/comment.component';
import { CommentUpsertDialogComponent } from './comment-upsert-dialog/comment-upsert-dialog.component';
import { UpsertDialogData } from './comment-upsert-dialog/comment-upsert-dialog.model';
import { CommentsService } from './comments.service';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommentComponent, MaterialModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent implements OnInit {
  isFetching = signal<boolean>(false);

  comments = this.commentsService.loadedComments;
  totalComments = this.commentsService.totalLoadedComments;
  pageSize = this.commentsService.pageSize;
  pageIndex = this.commentsService.pageIndex;
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  pageSizeOptions = [5, 10, 20];

  constructor(
    private commentsService: CommentsService,
    private dialog: MatDialog,
    private errorService: ErrorService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.loadPage(0, this.commentsService.pageSize());
  }

  onPageChange($event: PageEvent) {
    this.loadPage($event.pageIndex, $event.pageSize);
  }

  onAdd() {
    const dialogRef = this.dialog.open<
      CommentUpsertDialogComponent,
      UpsertDialogData,
      UpsertDialogData
    >(CommentUpsertDialogComponent, { data: { title: '', content: '' } });

    const subscription = dialogRef.afterClosed().subscribe(dialogData => {
      if (dialogData) {
        const addSubscription = this.commentsService
          .addComment(dialogData.title, dialogData.content)
          .subscribe({
            error: (err: Error) => this.errorService.showError(err.message)
          });
        this.destroyRef.onDestroy(() => addSubscription.unsubscribe());
      }
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  private loadPage(pageIndex: number, pageSize: number) {
    this.isFetching.set(true);
    const subscription = this.commentsService
      .loadPage(pageIndex, pageSize)
      .subscribe({
        error: (err: Error) => {
          this.errorService.showError(err.message);
        },
        complete: () => this.isFetching.set(false)
      });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
