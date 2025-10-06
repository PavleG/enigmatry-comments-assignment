import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';
import { MaterialModule } from '@shared/material.module';
import { COMMENT_DESCRIPTION_MAX_LENGTH, COMMENT_TITLE_MAX_LENGTH } from '../comments.constants';
import type { UpsertDialogData } from './comment-upsert-dialog.model';

@Component({
  selector: 'app-comment-upsert-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, MaterialModule],
  templateUrl: './comment-upsert-dialog.component.html',
  styleUrl: './comment-upsert-dialog.component.scss'
})
export class CommentUpsertDialogComponent {
  private readonly dialogRef = inject(
    MatDialogRef<CommentUpsertDialogComponent>
  );
  private data = inject<UpsertDialogData>(MAT_DIALOG_DATA);

  private readonly maxTitleLength = COMMENT_TITLE_MAX_LENGTH;
  private readonly maxContentLength = COMMENT_DESCRIPTION_MAX_LENGTH;

  form: FormGroup = new FormGroup({
    title: new FormControl(this.data.title, {
      validators: [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9 ]*$'),
        Validators.maxLength(this.maxTitleLength)
      ],
      nonNullable: true,
      updateOn: 'submit'
    }),
    content: new FormControl(this.data.content, {
      validators: [
        Validators.required,
        Validators.maxLength(this.maxContentLength)
      ],
      nonNullable: true,
      updateOn: 'submit'
    })
  });

  get isTitleInvalid() {
    return this.form.controls.title.touched && this.form.controls.title.invalid;
  }

  get isContentInvalid() {
    return (
      this.form.controls.content.touched && this.form.controls.content.invalid
    );
  }

  get titleErrorMessage(): string | null {
    const titleCtrl = this.form.controls.title;
    if (titleCtrl?.hasError('required')) {
      return $localize`:@@comment.title.required:Title is required`;
    }
    if (titleCtrl?.hasError('pattern')) {
      return $localize`:@@comment.title.pattern:Title can only contain letters, numbers, and spaces`;
    }
    if (titleCtrl?.hasError('maxlength')) {
      return $localize`:@@comment.title.maxlength:Title cannot exceed ${this.maxTitleLength} characters`;
    }
    return null;
  }

  get contentErrorMessage(): string | null {
    const contentCtrl = this.form.controls.content;
    if (contentCtrl?.hasError('required')) {
      return $localize`:@@comment.content.required:Description is required`;
    }
    if (contentCtrl?.hasError('maxlength')) {
      return $localize`:@@comment.content.maxlength:Description cannot exceed ${this.maxContentLength} characters`;
    }
    return null;
  }

  onPost() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.dialogRef.close({
      title: this.form.controls.title.value,
      content: this.form.controls.content.value
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
