import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommentComponent } from './comment/comment.component';
import { CommentsService } from './comments.service';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommentComponent, MatButtonModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent {
  constructor(private commentsService: CommentsService) {}

  get comments() {
    return this.commentsService.getComments();
  }

  onAdd() {
    // eslint-disable-next-line no-console
    console.log('Open edit dialog');
  }
}
