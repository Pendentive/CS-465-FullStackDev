import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiService } from '../../services/api.service';

import { Image } from '../../interfaces/image';
import { ImageDisplayCascadeComponent } from '../image-display-cascade/image-display-cascade.component';

@Component({
  selector: 'app-image-selector',
  standalone: true,
  imports: [
    CommonModule,
    ImageDisplayCascadeComponent,
  ],
  templateUrl: './image-selector.component.html'
})
export class ImageSelectorComponent implements OnInit, OnChanges {
  @Output() selectedImage = new EventEmitter<string[]>();
  @Input() currentImages: string[] = []; // Input for current image IDs
  @Input() columns: number = 3; // Input for number of columns
  images: Image[] = [];
  selectableImages: Image[] = []; // Images available for selection
  selectedImageIds: string[] = []; // Track selected image IDs
  currentImageObjects: Image[] = []; // Array to hold Image objects for current images

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadImages();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentImages'] && this.images) {
      this.updateCurrentImageObjects();
    }
    if (changes['images'] && this.currentImages) {
      this.updateCurrentImageObjects();
    }
  }

  loadImages(): void {
    this.apiService.getImages().subscribe(images => {
      this.images = images;
      this.selectableImages = images.filter(image => !this.currentImages.includes(image._id));
      this.updateCurrentImageObjects();
    });
  }

  updateCurrentImageObjects(): void {
    this.currentImageObjects = this.currentImages.map(id => this.images.find(img => img._id === id)).filter(img => img !== undefined) as Image[];
  }

  toggleImageSelection(imageId: string): void {
    if (this.selectedImageIds.includes(imageId)) {
      this.selectedImageIds = this.selectedImageIds.filter(id => id !== imageId);
    } else {
      this.selectedImageIds.push(imageId);
    }
  }

  addImage(): void {
    // Add selected images to current images and emit the updated array
    const newImages = [...this.currentImages, ...this.selectedImageIds];
    this.selectedImage.emit(newImages);
  }

  isImageSelected(imageId: string): boolean {
    return this.selectedImageIds.includes(imageId);
  }
}
