import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import type { UpsertDialogData } from './comment-upsert-dialog.model';

@Component({
  selector: 'app-comment-upsert-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatFormFieldModule,
    MatInput,
    MatIcon,
    FormsModule
  ],
  templateUrl: './comment-upsert-dialog.component.html',
  styleUrl: './comment-upsert-dialog.component.scss'
})
export class CommentUpsertDialogComponent {
  readonly dialogRef = inject(MatDialogRef<CommentUpsertDialogComponent>);
  readonly data = inject<UpsertDialogData>(MAT_DIALOG_DATA);

  closeDialog(): void {
    this.dialogRef.close();
  }
}
