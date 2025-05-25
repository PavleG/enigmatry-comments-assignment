/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable no-bitwise */
import { Injectable } from '@angular/core';
import type { Comment } from '@shared/model/comment.model';

@Injectable({ providedIn: 'root' })
export class CommentsService {
  private comments: Comment[] = [
    {
      id: this.generateGUID(),
      title: 'This sucks',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus delectus',
      postedOn: '2024-10-02',
      editedOn: '2024-10-03'
    },
    {
      id: this.generateGUID(),
      title: 'Best story ever',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus delectus',
      postedOn: '2024-10-02',
      editedOn: ''
    },
    {
      id: this.generateGUID(),
      title: 'FAAAKEEEE',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus delectus',
      postedOn: '2024-10-28',
      editedOn: '2024-11-03'
    }
  ];

  getComments(): Comment[] {
    return this.comments;
  }

  getComment(id: string): Comment | undefined {
    return this.comments.find(c => c.id === id);
  }

  addComment(title: string, description: string): void {
    this.comments.unshift({
      id: this.generateGUID(),
      title,
      description,
      postedOn: this.getCurrentDate(),
      editedOn: ''
    });
  }

  updateComment(
    id: string,
    updatedTitle: string,
    updatedDescription: string
  ): void {
    this.comments = this.comments.map(comment =>
      comment.id === id
        ? {
            ...comment,
            title: updatedTitle,
            description: updatedDescription,
            editedOn: this.getCurrentDate()
          }
        : comment
    );
  }

  deleteComment(id: string): void {
    this.comments = this.comments.filter(comment => comment.id !== id);
  }

  private getCurrentDate(): string {
    return new Date().toISOString()
.split('T')[0];
  }

  private generateGUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/gu, c => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : r & 0x3 | 0x8;
      return v.toString(16);
    });
  }
}
