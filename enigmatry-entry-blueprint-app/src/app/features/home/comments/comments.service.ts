/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable no-bitwise */
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CommentsService {
  private comments = [
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

  getComments() {
    return this.comments;
  }

  addComment(title: string, description: string) {
    this.comments.unshift({
      id: this.generateGUID(),
      title,
      description,
      postedOn: this.getCurrentDate(),
      editedOn: ''
    });
  }

  updateComment(id: string, updatedTitle: string, updatedDescription: string) {
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

  deleteComment(id: string) {
    this.comments = this.comments.filter(comment => comment.id !== id);
  }

  private getCurrentDate() {
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
