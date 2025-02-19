import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiService } from '../../services/api.service';

import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

import { Image } from '../../interfaces/image';
import { ImageDisplayCascadeComponent } from '../image-display-cascade/image-display-cascade.component';

@Component({
  selector: 'app-image-selector',
  standalone: true,
  imports: [
    CommonModule,
    ImageDisplayCascadeComponent,
    MatListModule,
    MatButtonModule,
  ],
  templateUrl: './image-selector.component.html'
})
export class ImageSelectorComponent implements OnInit {
  @Input() columns: number = 2;                                   // Input for number of columns
  @Input() currentImages: Image[] = [];                           // Input for current image objects
  @Output() currentImagesChange = new EventEmitter<Image[]>();    // Emits current images array
  allImages: Image[] = [];
  selectableImages: Image[] = []; // Images available for selection
  selectedImageIds: string[] = []; // Track selected image IDs

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadImages();
  }

  ngOnChanges(): void {
    this.updateSelectableImages();
  }

  loadImages(): void {
    this.apiService.getImages().subscribe(images => {
      this.allImages = images;
      this.updateSelectableImages();       // Filter current images from selectable images
    });
  }

  updateSelectableImages(): void {
    this.selectableImages = this.allImages.filter(image => !this.isCurrentImage(image));
  }

  // Helper function to check if an image is in the currentImages array
  isCurrentImage(image: Image): boolean {
    return this.currentImages.some(img => img._id === image._id);
  }

  addImage(image: Image): void {
    this.currentImages.push(image);
    this.updateSelectableImages();
    this.currentImagesChange.emit(this.currentImages);
  }

  removeImage(image: Image): void {
    this.currentImages = this.currentImages.filter(img => img._id !== image._id);
    this.updateSelectableImages();
    this.currentImagesChange.emit(this.currentImages);
  }
}
