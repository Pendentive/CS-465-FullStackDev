import { Component, OnInit, Output, EventEmitter, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiService } from '../../services/api.service';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule, MatAccordion } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';

import { Image } from '../../interfaces/image';
import { ImageDisplayCascadeComponent } from '../image-display-cascade/image-display-cascade.component';

@Component({
  selector: 'app-image-selector',
  standalone: true,
  imports: [
    CommonModule,
    ImageDisplayCascadeComponent,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatExpansionModule,
    MatToolbarModule,
  ],
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class ImageSelectorComponent implements OnInit {
  @Input() columns: number = 2;                                   // Input for number of columns
  @Input() currentImages: Image[] = [];                           // Input for current image objects
  @Output() currentImagesChange = new EventEmitter<Image[]>();    // Emits current images array
  allImages: Image[] = [];
  selectableImages: Image[] = [];           // Images available for selection
  selectedImageIds: string[] = [];          // Track selected image IDs

  @ViewChild(MatAccordion) accordion!: MatAccordion;

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

  toggleSelection(image: Image): void {
    const index = this.selectedImageIds.indexOf(image._id);
    if (index > -1) {
      this.selectedImageIds.splice(index, 1); // Deselect
    } else {
      this.selectedImageIds.push(image._id); // Select
    }
  }

  isSelected(image: Image): boolean {
    return this.selectedImageIds.includes(image._id);
  }

  addSelectedImages(): void {
    const selectedImages = this.selectableImages.filter(image => this.selectedImageIds.includes(image._id));
    const newCurrentImages = [...this.currentImages]; // Create a copy
    selectedImages.forEach(image => {
      if (!this.isCurrentImage(image)) {
        newCurrentImages.push(image);
      }
    });

    this.currentImages = newCurrentImages;
    this.updateSelectableImages();
    this.selectedImageIds = []; // Clear selected images
    this.currentImagesChange.emit([...this.currentImages]); // Emit a new array
  }

  removeSelectedImages(): void {
    const newCurrentImages = this.currentImages.filter(image => !this.selectedImageIds.includes(image._id));
    this.currentImages = newCurrentImages;
    this.updateSelectableImages();
    this.selectedImageIds = []; // Clear selected images
    this.currentImagesChange.emit([...this.currentImages]); // Emit a new array
  }
}
