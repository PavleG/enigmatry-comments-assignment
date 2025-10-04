import { inject } from '@angular/core';
import { CanActivateFn, Router, Routes } from '@angular/router';
import { CommentDetailsComponent } from '@features/home/comments/comment-details/comment-details.component';
import { CommentsService } from '@features/home/comments/comments.service';
import { HomeComponent } from '@features/home/home.component';
import { MessageService } from '@features/home/message-container/message.service';
import { MessagesComponent } from '@features/messages/messages.component';
import { NotAuthorizedComponent } from '@shared/components/not-authorized/not-authorized.component';
import { NotFoundComponent } from '@shared/components/not-found/not-found.component';
import { map, catchError, of } from 'rxjs';

export const detailsCanActivate: CanActivateFn = route => {
  const commentId = route.params.commentId;
  const commentsService = inject(CommentsService);
  const router = inject(Router);
  const guardLen = 5;

  return commentsService.getComment(commentId).pipe(
    map(comment => comment && comment.description.length > guardLen
      ? true
      : router.createUrlTree(['/unauthorized'])
    ),
    catchError(() => of(router.createUrlTree(['/unauthorized'])))
  );
};

export const messagesCanActivate: CanActivateFn = () => {
  const router = inject(Router);
  const messageService = inject(MessageService);

  return messageService
    .canAccessMessagesPage()
    .pipe(map(canAccess => canAccess ? true : router.createUrlTree(['/'])));
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
    title: $localize`:@@route.comment-details:Comment Details`,
    pathMatch: 'full',
    canActivate: [detailsCanActivate]
  },
  {
    path: 'messages',
    component: MessagesComponent,
    title: $localize`:@@route.messages:Messages`,
    canActivate: [messagesCanActivate]
  },
  {
    path: 'unauthorized',
    component: NotAuthorizedComponent,
    title: $localize`:@@route.unauthorized:Not Authorized`
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: $localize`:@@route.not-found:Not Found`
  }
];
