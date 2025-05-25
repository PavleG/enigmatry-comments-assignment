import { Component, computed, inject, input } from '@angular/core';
import { CommentsService } from '../comments.service';

@Component({
  selector: 'app-comment-details',
  standalone: true,
  imports: [],
  templateUrl: './comment-details.component.html',
  styleUrl: './comment-details.component.scss'
})
export class CommentDetailsComponent {
  commentId = input.required<string>();
  commentsService = inject(CommentsService);

  comment = computed(() => this.commentsService.getComment(this.commentId()));
}
