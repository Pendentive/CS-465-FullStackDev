import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Image } from '../../interfaces/image';

@Component({
  selector: 'app-image-display-cascade',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-display-cascade.component.html',
  styleUrls: ['./image-display-cascade.component.css']
})
export class ImageDisplayCascadeComponent implements OnChanges {
  @Input() images: Image[] = [];
  @Input() columns: number = 2;
  imageRows: Image[][] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['images'] || changes['columns']) {
      this.createImageRows();
    }
  }

  createImageRows(): void {
    this.imageRows = [];
    if (!this.images || this.images.length === 0) {
      return;
    }

    const numRows = Math.ceil(this.images.length / this.columns);
    for (let i = 0; i < numRows; i++) {
      const row: Image[] = [];
      for (let j = 0; j < this.columns; j++) {
        const imageIndex = j * numRows + i;
        if (imageIndex < this.images.length) {
          row.push(this.images[imageIndex]);
        }
      }
      this.imageRows.push(row);
    }
  }
}
