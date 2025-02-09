import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
  @Output() selectedImage = new EventEmitter<string>();
  images: Image[] = [];
  selectedImageId: string | null = null;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadImages();
  }

  loadImages(): void {
    this.apiService.getImages().subscribe(images => {
      this.images = images;
    });
  }

  onImageSelected(imageId: string): void {
    this.selectedImageId = imageId;
    this.selectedImage.emit(imageId);
  }
}
