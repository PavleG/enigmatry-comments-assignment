import { Component } from '@angular/core';
import { CommentsComponent } from './comments/comments.component';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommentsComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

}
