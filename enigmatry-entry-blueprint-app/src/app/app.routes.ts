import { inject } from '@angular/core';
import { CanActivateFn, Router, Routes } from '@angular/router';
import { CommentDetailsComponent } from '@features/home/comments/comment-details/comment-details.component';
import { CommentsService } from '@features/home/comments/comments.service';
import { HomeComponent } from '@features/home/home.component';
import { MessageService } from '@features/home/message-container/message.service';
import { MessagesComponent } from '@features/messages/messages.component';
import { NotAuthorizedComponent } from '@shared/components/not-authorized/not-authorized.component';
import { NotFoundComponent } from '@shared/components/not-found/not-found.component';

export const detailsCanActivate: CanActivateFn = route => {
  const commentId = route.params.commentId;
  const commentsService = inject(CommentsService);
  const router = inject(Router);

  const comment = commentsService.getComment(commentId);
  const guardLen = 5;

  if (comment && comment.description.length > guardLen) {
    return true;
  }

  return router.createUrlTree(['/unauthorized']);
};

export const messagesCanActivate: CanActivateFn = _ => {
  const router = inject(Router);
  const messageService = inject(MessageService);

  if (messageService.canAccessMessagesPage()) {
    return true;
  }

  return router.createUrlTree(['/']);
};

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: $localize`:@@route.home:Home`
  },
  {
    path: 'comments/:commentId',
    component: CommentDetailsComponent,
    pathMatch: 'full',
    canActivate: [detailsCanActivate]
  },
  {
    path: 'messages',
    component: MessagesComponent,
    canActivate: [messagesCanActivate]
  },
  {
    path: 'unauthorized',
    component: NotAuthorizedComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
