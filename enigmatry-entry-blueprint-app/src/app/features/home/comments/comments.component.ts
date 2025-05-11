import { Component } from '@angular/core';
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
export class CommentsComponent {
  constructor(
    private commentsService: CommentsService,
    private dialog: MatDialog
  ) {}

  get comments() {
    return this.commentsService.getComments();
  }

  onAdd() {
    const dialogRef = this.dialog.open<
      CommentUpsertDialogComponent,
      UpsertDialogData,
      UpsertDialogData
    >(CommentUpsertDialogComponent, { data: { title: '', content: '' } });
    dialogRef
      .afterClosed()
      .subscribe((result: UpsertDialogData | undefined) => {
        if (result !== undefined) {
          this.commentsService.addComment(
            result.title,
            result.content
          );
        }
      });
  }
}
