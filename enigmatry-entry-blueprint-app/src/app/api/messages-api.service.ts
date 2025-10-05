import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MessagesClient {
  private readonly apiUrl = `${environment.apiUrl}/api/messages`;

  constructor(private httpClient: HttpClient) {}

  dismiss(): Observable<void> {
    return this.httpClient.post<void>(`${this.apiUrl}/dismiss`, {});
  }

  isDismissed(): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.apiUrl}/isDismissed`);
  }
}
