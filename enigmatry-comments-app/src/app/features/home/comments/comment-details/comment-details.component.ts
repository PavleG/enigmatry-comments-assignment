import {
  Component,
  DestroyRef,
  inject,
  input,
  OnInit,
  signal
} from '@angular/core';
import { ErrorService } from '@app/services/error.service';
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
  errorService = inject(ErrorService);
  destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const subscription = this.commentsService
      .getComment(this.commentId())
      .subscribe({
        next: response => {
          this.comment.set(response);
        },
        error: (err: Error) => {
          this.errorService.showError(err.message);
        }
      });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
