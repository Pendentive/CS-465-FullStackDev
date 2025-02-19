import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
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
export class ImageSelectorComponent implements OnInit {
  @Output() selectedImage = new EventEmitter<string[]>();
  @Input() currentImages: Image[] = []; // Input for current image objects
  @Input() columns: number = 2; // Input for number of columns
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
      // Filter current images from selectable images
      this.selectableImages = images.filter(image => !this.isCurrentImage(image));
    });
  }

  // Helper function to check if an image is in the currentImages array
  isCurrentImage(image: Image): boolean {
    return this.currentImages.some(img => img._id === image._id);
  }
}
