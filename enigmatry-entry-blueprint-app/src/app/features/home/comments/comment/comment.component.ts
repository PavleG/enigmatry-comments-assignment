import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import type { Comment } from '../../../../shared/model/comment.model';
import { CommentUpsertDialogComponent } from '../comment-upsert-dialog/comment-upsert-dialog.component';
import type { UpsertDialogData } from '../comment-upsert-dialog/comment-upsert-dialog.model';
import { CommentsService } from '../comments.service';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterLink],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {
  @Input({ required: true }) comment: Comment;
  constructor(private commentsService: CommentsService, private dialog: MatDialog) {}

  onEdit() {
    const dialogRef = this.dialog.open<CommentUpsertDialogComponent, UpsertDialogData, UpsertDialogData>(CommentUpsertDialogComponent, {
      data: { title: this.comment.title, content: this.comment.description }
    });
    dialogRef.afterClosed().subscribe((result: UpsertDialogData | undefined) => {
      if (result !== undefined) {
        this.commentsService.updateComment(
          this.comment.id,
          result.title,
          result.content
        );
      }
    });
  }

  onDelete(id: string) {
    this.commentsService.deleteComment(id);
  }
}
