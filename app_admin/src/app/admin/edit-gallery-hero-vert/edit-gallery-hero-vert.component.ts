import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { ImageSelectorComponent } from '../../components/image-selector/image-selector.component';
import { Image } from '../../interfaces/image';
import { ComponentService } from '../../services/component.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-edit-gallery-hero-vert',
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
  templateUrl: './edit-gallery-hero-vert.component.html',
  styleUrls: ['./edit-gallery-hero-vert.component.css']
})
export class EditGalleryHeroVertComponent implements OnInit, OnChanges {
  @Input() formGroup!: FormGroup;
  @Input() componentId!: string;
  currentImages: string[] = [];
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

  onImagesSelected(imageIds: string[]): void {
    this.formGroup.get('data.images')?.setValue(imageIds);
    this.currentImages = imageIds;
  }

  loadCurrentImages(): void {
    this.currentImages = this.formGroup.get('data.images')?.value || [];
  }

  private setComponentTitle(): void {
    if (this.formGroup && this.formGroup.get('kind')?.value) {
      this.componentTitle = this.formGroup.get('kind')?.value + ' Component';
    } else {
      this.componentTitle = 'Component';
    }
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.componentService.updateGalleryHeroVert(this.componentId, this.formGroup.get('data')?.value).subscribe({
        next: () => {
          console.log('GalleryHeroVert component updated successfully');
        },
        error: (error) => {
          console.error('Error updating GalleryHeroVert component:', error);
        }
      });
    }
  }
}

// TODO: SOMETHING IS CITED ON PAGE