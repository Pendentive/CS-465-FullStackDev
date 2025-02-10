import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiService } from '../../services/api.service';

import { Image } from '../../interfaces/image';
import { ImageListComponent } from '../image-list/image-list.component';

@Component({
  selector: 'app-image-selector',
  standalone: true,
  imports: [
    CommonModule, 
    ImageListComponent
  ],
  templateUrl: './image-selector.component.html'
})
export class ImageSelectorComponent implements OnInit {
  @Output() selectedImage = new EventEmitter<string[]>();
  @Input() currentImages: string[] = []; // Input for current image IDs
  images: Image[] = [];
  selectableImages: Image[] = []; // Images available for selection
  selectedImageIds: string[] = []; // Track selected image IDs

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadImages();
  }

  loadImages(): void {
    this.apiService.getImages().subscribe(images => {
      this.images = images;
      this.selectableImages = images.filter(image => !this.currentImages.includes(image._id));
    });
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

  getImagePath(imageId: string): string {
    const image = this.images.find(img => img._id === imageId);
    return image ? image.path : '';
  }
}
