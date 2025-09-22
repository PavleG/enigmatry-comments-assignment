import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import type { Comment } from '@shared/model/comment.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CommentsClient {
  private readonly apiUrl = 'http://localhost:5018/api/comments';

  constructor(private httpClient: HttpClient) {}

  getComments(): Observable<Comment[]> {
    return this.httpClient.get<CommentApiDto[]>(this.apiUrl).pipe(
      map(response =>
        response.map(item => ({
          id: item.id,
          title: item.title,
          description: item.text,
          postedOn: item.createdAt,
          editedOn: item.lastEditedAt
        }))
      )
    );
  }

  getComment(id: string): Observable<Comment> {
    return this.httpClient.get<CommentApiDto>(`${this.apiUrl}/${id}`).pipe(
      map(response => ({
        id: response.id,
        title: response.title,
        description: response.text,
        postedOn: response.createdAt,
        editedOn: response.lastEditedAt
      }))
    );
  }

  addComment(title: string, description: string): Observable<Comment> {
    return this.httpClient
      .post<CommentApiDto>(this.apiUrl, { title, text: description })
      .pipe(
        map(response => ({
          id: response.id,
          title: response.title,
          description: response.text,
          postedOn: response.createdAt,
          editedOn: response.lastEditedAt
        }))
      );
  }

  updateComment(
    id: string,
    title: string,
    description: string
  ): Observable<void> {
    return this.httpClient.put<void>(`${this.apiUrl}/${id}`, {
      title,
      text: description
    });
  }

  deleteComment(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }
}

export interface CommentApiDto {
  id: string;
  title: string;
  text: string;
  createdAt: string;
  lastEditedAt: string;
}
