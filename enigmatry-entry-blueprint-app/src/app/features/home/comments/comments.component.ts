import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { CommentComponent } from './comment/comment.component';
import { CommentUpsertDialogComponent } from './comment-upsert-dialog/comment-upsert-dialog.component';
import { UpsertDialogData } from './comment-upsert-dialog/comment-upsert-dialog.model';
import { CommentsService } from './comments.service';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommentComponent, MatButtonModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent implements OnInit {
  isFetching = signal<boolean>(false);
  error = signal<string>('');
  private destroyRef = inject(DestroyRef);

  constructor(
    private commentsService: CommentsService,
    private dialog: MatDialog
  ) {}
  comments = this.commentsService.loadedComments;

  ngOnInit(): void {
    this.isFetching.set(true);
    const subscription = this.commentsService.getComments().subscribe({
      error: (err: Error) => {
        this.error.set(err.message);
      },
      complete: () => this.isFetching.set(false)
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onAdd() {
    const dialogRef = this.dialog.open<
      CommentUpsertDialogComponent,
      UpsertDialogData,
      UpsertDialogData
    >(CommentUpsertDialogComponent, { data: { title: '', content: '' } });

    const subscription = dialogRef
      .afterClosed()
      .subscribe((dialogData: UpsertDialogData | undefined) => {
        if (dialogData !== undefined) {
          const addSubscription = this.commentsService
            .addComment(dialogData.title, dialogData.content)
            .subscribe({
              error: (err: Error) => {
                this.error.set(err.message);
              }
            });
          this.destroyRef.onDestroy(() => {
            addSubscription.unsubscribe();
          });
        }
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
