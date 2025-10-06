import { Component } from '@angular/core';
import { CommentsComponent } from './comments/comments.component';
import { MessageContainerComponent } from './message-container/message-container.component';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommentsComponent, MessageContainerComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

}
