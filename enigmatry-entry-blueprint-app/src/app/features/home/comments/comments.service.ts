import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CommentsService {
  private comments = [
    {
      id: 'c1',
      title: 'This sucks',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus delectus',
      postedOn: '2024-10-02',
      editedOn: '2024-10-03'
    },
    {
      id: 'c2',
      title: 'Best story ever',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus delectus',
      postedOn: '2024-10-02',
      editedOn: ''
    },
    {
      id: 'c3',
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

  updateComment(id: string, updatedTitle: string, updatedDescription: string) {
    this.comments = this.comments.map(comment =>
      comment.id === id
        ? {
            ...comment,
            title: updatedTitle,
            description: updatedDescription,
            editedOn: new Date().toISOString()
            .split('T')[0]
          }
        : comment
    );
  }

  deleteComment(id: string) {
    this.comments = this.comments.filter(comment => comment.id !== id);
  }
}
