import { DatePipe } from '@angular/common';
import { Component, DestroyRef, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { ErrorService } from '@app/services/error.service';
import { PipesModule } from '@shared/pipes/pipes.module';
import { filter, mergeMap } from 'rxjs';
import type { Comment } from '../../../../shared/model/comment.model';
import { CommentUpsertDialogComponent } from '../comment-upsert-dialog/comment-upsert-dialog.component';
import type { UpsertDialogData } from '../comment-upsert-dialog/comment-upsert-dialog.model';
import { COMMENT_CARD_DESCRIPTION_MAX_LENGTH } from '../comments.constants';
import { CommentsService } from '../comments.service';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterLink, DatePipe, PipesModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {
  @Input({ required: true }) comment: Comment;
  readonly cardDescriptionMaxLength = COMMENT_CARD_DESCRIPTION_MAX_LENGTH;

  constructor(
    private commentsService: CommentsService,
    private dialog: MatDialog,
    private errorService: ErrorService,
    private destroyRef: DestroyRef
  ) {}

  onEdit() {
    const dialogRef = this.dialog.open<
      CommentUpsertDialogComponent,
      UpsertDialogData,
      UpsertDialogData
    >(CommentUpsertDialogComponent, {
      data: { title: this.comment.title, content: this.comment.description }
    });

    const subscription = dialogRef
      .afterClosed()
      .pipe(
        filter((result): result is UpsertDialogData => result !== undefined),
        mergeMap(result =>
          this.commentsService.updateComment(
            this.comment.id,
            result.title,
            result.content
          )
        )
      )
      .subscribe({
        error: (err: Error) => this.errorService.showError(err.message)
      });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  onDelete(id: string) {
    const subscription = this.commentsService.deleteComment(id).subscribe({
      error: (err: Error) => {
        this.errorService.showError(err.message);
      }
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
