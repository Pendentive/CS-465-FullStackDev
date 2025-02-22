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
  selector: 'app-edit-gallery-grid',
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
  templateUrl: './edit-gallery-grid.component.html',
  styleUrls: ['./edit-gallery-grid.component.css']
})
export class EditGalleryGridComponent implements OnInit, OnChanges {
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
    // TODO: Refactor once title is fixed in model
    // this.componentTitle = this.formGroup.get('title')?.value || 'Edit Gallery Grid';
    this.componentTitle = 'Edit Gallery Grid';
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.componentService.updateGalleryGrid(this.componentId, {
        ...this.formGroup.value,
        images: this.currentImages.map((img) => img._id)
      }).subscribe({
        next: () => {
          console.log('GalleryGrid component updated successfully');
        },
        error: (error) => {
          console.error('Error updating GalleryGrid component:', error);
        }
      });
    }
  }
}