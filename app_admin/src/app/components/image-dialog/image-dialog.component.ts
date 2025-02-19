import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-image-dialog',
  template: `
    <div class="popup">
      <img [src]="data.image.url" class="enlarged">
    </div>
  `,
  styles: [`
    .popup img { width: 90%; max-height: 80vh; }
  `]
})
export class ImageDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
