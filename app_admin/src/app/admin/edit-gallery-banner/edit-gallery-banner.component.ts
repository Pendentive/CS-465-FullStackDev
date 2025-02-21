import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ComponentService } from '../../services/component.service';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ImageSelectorComponent } from '../../components/image-selector/image-selector.component';
import { Image } from '../../interfaces/image';

@Component({
  selector: 'app-edit-gallery-banner',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ImageSelectorComponent,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './edit-gallery-banner.component.html',
  styleUrls: ['./edit-gallery-banner.component.css']
})
export class EditGalleryBannerComponent implements OnInit, OnChanges {
  @Input() formGroup!: FormGroup;
  @Input() componentId!: string;
  currentImages: Image[] = [];
  componentTitle: string = '';

  constructor(private componentService: ComponentService) {}

  ngOnInit(): void {
    this.loadCurrentImages();
    this.setComponentTitle();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formGroup']) {
      this.setComponentTitle();
    }
  }

  loadCurrentImages(): void {
    this.currentImages = this.formGroup.get('images')?.value || [];
  }

  private setComponentTitle(): void {
    this.componentTitle = this.formGroup.get('title')?.value || 'Edit Gallery Banner';
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.componentService.updateGalleryBanner(this.componentId, {
        ...this.formGroup.value,
        images: this.currentImages.map(image => image._id)
      }).subscribe({
        next: () => {
          console.log('GalleryBanner component updated successfully');
        },
        error: (error) => {
          console.error('Error updating GalleryBanner component:', error);
        }
      });
    }
  }
}
