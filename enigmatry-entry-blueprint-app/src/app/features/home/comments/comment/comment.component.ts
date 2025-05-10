import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommentsService } from '../comments.service';
import type { Comment } from './comment.model';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {
  @Input({ required: true }) comment: Comment;

  constructor(private commentsService: CommentsService) {}

  onEdit() {
    // eslint-disable-next-line no-console
    console.log('Open edit dialog');
  }

  onDelete(id: string) {
    this.commentsService.deleteComment(id);
  }
}
