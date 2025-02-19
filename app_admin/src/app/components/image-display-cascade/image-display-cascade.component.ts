import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog'; // Ensure this is imported

import { ImageUrlService } from '../../services/image-url.service';

import { Image } from '../../interfaces/image';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';

@Component({
  selector: 'image-display-cascade',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatDividerModule,
    MatGridListModule,
    MatDialogModule,
    MatPaginatorModule,
  ],
  templateUrl: './image-display-cascade.component.html',
  styleUrls: ['./image-display-cascade.component.css'],
  providers: [ImageUrlService]
})
export class ImageDisplayCascadeComponent implements OnChanges {
  @Input() images: Image[] = [];
  @Input() columns: number = 2;
  @Input() title: string = '';

  filteredImages: Image[] = [];
  private debounceTimeout: any;

  constructor(public imageUrlService: ImageUrlService, public dialog: MatDialog) {}

  ngOnInit() {
    this.filteredImages = [...this.images]; // Initialize with all images
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['images']) {
      this.filteredImages = [...this.images]; // Update filteredImages when images change
    }
  }

  // Sorting Logic
  sortImages(sortBy: string) {
    if (sortBy === 'name') {
      this.filteredImages.sort((a, b) => a.alt.localeCompare(b.alt));
    } else if (sortBy === 'date') {
      this.filteredImages.sort((a, b) => new Date(b.metadata.dateCreated).getTime() - new Date(a.metadata.dateCreated).getTime());
    }
  }

  // Filtering Logic
  filterImages(event: Event) {
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }

    this.debounceTimeout = setTimeout(() => {
      let filterValue = '';
      if (event.target instanceof HTMLInputElement) {
        filterValue = (event.target as HTMLInputElement).value;
      }

      if (filterValue === '') {
        this.filteredImages = [...this.images]; // Reset to original images
      } else {
        this.filteredImages = this.images.filter(img =>
          img.alt.toLowerCase().includes(filterValue.toLowerCase())
        );
      }
    }, 300); // Adjust the debounce delay (in milliseconds) as needed
  }

  // Enlarge Image (Popup View using MatDialog)
  enlargeImage(image: Image) {
    this.dialog.open(ImageDialogComponent, { data: { image } });
  }
}
