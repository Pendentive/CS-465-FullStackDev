import { Component, OnInit, Output, EventEmitter, Input, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiService } from '../../services/api.service';

import { MatListModule, MatSelectionList, MatListOption } from '@angular/material/list';
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
  selectableImages: Image[] = [];           // Images available for selection
  selectedImageIds: string[] = [];          // Track selected image IDs

  @ViewChildren('selectableImagesList') selectableImagesList!: QueryList<MatSelectionList>;
  @ViewChildren('currentImagesList') currentImagesList!: QueryList<MatSelectionList>;

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

    selectedImages.forEach(image => {
      if (!this.isCurrentImage(image)) {
        this.currentImages.push(image);
      }
    });

    this.updateSelectableImages();
    this.selectedImageIds = []; // Clear selected images
  }

  removeSelectedImages(): void {
    const selectedImages = this.currentImagesList.first.selectedOptions.selected.map(item => item.value);
    selectedImages.forEach(image => {
      this.currentImages = this.currentImages.filter(img => img._id !== image._id);
    });
    this.updateSelectableImages();
    this.currentImagesChange.emit(this.currentImages);
    this.currentImagesList.first.deselectAll(); // Clear selection
  }
}
