import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';


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
    MatIconModule,
  ],
  templateUrl: './image-display-cascade.component.html',
  styleUrls: ['./image-display-cascade.component.css'],
  providers: [ImageUrlService]
})
export class ImageDisplayCascadeComponent implements OnChanges {
  @Input() images: Image[] = [];
  @Input() columns: number = 2;
  @Input() title: string = '';
  @Input() selectedImageIds: string[] = [];
  @Output() imageClick = new EventEmitter<Image>();

  filteredImages: Image[] = [];
  pagedImages: Image[] = [];
  private debounceTimeout: any;
  pageSize: number = 12;
  pageIndex: number = 0;

  constructor(public imageUrlService: ImageUrlService, public dialog: MatDialog) {}

  ngOnInit() {
    this.filteredImages = [...this.images]; // Initialize with all images
    this.updatePagedImages();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['images']) {
      this.filteredImages = [...this.images]; // Update filteredImages when images change
      this.updatePagedImages();
    }
  }

  // Sorting Logic
  sortImages(sortBy: string) {
    if (sortBy === 'name') {
      this.filteredImages.sort((a, b) => a.alt.localeCompare(b.alt));
    } else if (sortBy === 'date') {
      this.filteredImages.sort((a, b) => new Date(b.metadata.dateCreated).getTime() - new Date(a.metadata.dateCreated).getTime());
    }
    this.updatePagedImages();
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
        const searchTerm = filterValue.toLowerCase();
        this.filteredImages = this.images.filter(img =>
          img.alt.toLowerCase().includes(searchTerm) || // Filter by alt (name)
          img.filename.toLowerCase().includes(searchTerm) // Filter by filename
        );
      }
      this.updatePagedImages();
    }, 300); // Adjust the debounce delay (in milliseconds) as needed
  }

  onImageClick(image: Image): void {
    this.imageClick.emit(image);
  }

  isSelected(image: Image): boolean {
    return this.selectedImageIds.includes(image._id);
  }

  // Enlarge Image (Popup View using MatDialog)
  enlargeImage(image: Image) {
    this.dialog.open(ImageDialogComponent, { data: { image } });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagedImages();
  }

  updatePagedImages() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedImages = this.filteredImages.slice(startIndex, endIndex);
  }
}
