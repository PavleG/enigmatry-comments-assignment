import {
  Component,
  DestroyRef,
  inject,
  input,
  OnInit,
  signal
} from '@angular/core';
import type { Comment } from '@shared/model/comment.model';
import { CommentsService } from '../comments.service';

@Component({
  selector: 'app-comment-details',
  standalone: true,
  imports: [],
  templateUrl: './comment-details.component.html',
  styleUrl: './comment-details.component.scss'
})
export class CommentDetailsComponent implements OnInit {
  comment = signal<Comment | undefined>(undefined);

  commentId = input.required<string>();
  commentsService = inject(CommentsService);
  destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const subscription = this.commentsService
      .getComment(this.commentId())
      .subscribe({
        next: response => {
          this.comment.set(response);
        }
      });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
