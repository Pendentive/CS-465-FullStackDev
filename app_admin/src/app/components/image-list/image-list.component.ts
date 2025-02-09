import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Image } from '../../interfaces/image';

@Component({
  selector: 'app-image-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-list.component.html',
})
export class ImageListComponent {
  @Input() images: Image[] = [];
  @Output() imageSelected = new EventEmitter<string>();

  selectImage(imageId: string): void {
    this.imageSelected.emit(imageId);
  }
}
