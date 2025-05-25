import { inject } from '@angular/core';
import { CanActivateFn, Router, Routes } from '@angular/router';
import { CommentDetailsComponent } from '@features/home/comments/comment-details/comment-details.component';
import { CommentsService } from '@features/home/comments/comments.service';
import { HomeComponent } from '@features/home/home.component';
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
    path: 'unauthorized',
    component: NotAuthorizedComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
