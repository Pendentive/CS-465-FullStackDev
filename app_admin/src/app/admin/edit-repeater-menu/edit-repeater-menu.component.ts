import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import {
  FormGroup,
  FormArray,
  FormBuilder,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ComponentService } from '../../services/component.service';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ImageSelectorComponent } from '../../components/image-selector/image-selector.component';
import { Image } from '../../interfaces/image';
import { RepeaterMenu, MenuCard } from '../../interfaces/repeater-menu';

@Component({
  selector: 'app-edit-repeater-menu',
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
  templateUrl: './edit-repeater-menu.component.html',
  styleUrls: ['./edit-repeater-menu.component.css']
})
export class EditRepeaterMenuComponent implements OnInit, OnChanges {
  @Input() formGroup!: FormGroup;
  @Input() componentId!: string;

  componentTitle: string = '';
  imageValues: Image[][] = []; // Track images separately

  constructor(
    private componentService: ComponentService,
    private fb: FormBuilder
  ) {}

  // Helper getter to iterate over `menuCards` in the template
  get menuCards(): FormArray {
    const cards = this.formGroup.get('menuCards');
    if (!cards) {
      console.error('No menuCards found in formGroup:', this.formGroup.value);
      return this.fb.array([]); 
    }
    return cards as FormArray;
  }

  ngOnInit(): void {
    this.setComponentTitle();
    this.initializeImageValues();
    
    // Debug logging
    console.log('Initial form structure:', this.formGroup.value);
    this.menuCards.controls.forEach((control, index) => {
      console.log(`Card ${index} values:`, control.value);
    });
  }

  private initializeImageValues(): void {
    this.imageValues = this.menuCards.controls.map(control => {
      const image = control.get('image')?.value;
      return image ? [image] : [];
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formGroup']) {
      this.setComponentTitle();
      this.initializeImageValues();
    }
  }

  private setComponentTitle(): void {
    // Use provided title or a default
    this.componentTitle =
      this.formGroup.get('title')?.value || 'Edit Repeater Menu';
  }

  // Called when the user picks images from <app-image-selector>
  // Stores the array of images into the form control
  onImagesChange(newImages: Image[], index: number): void {
    const imageControl = this.menuCards.at(index).get('image');
    if (!imageControl) return;

    if (newImages.length === 0) {
      // Remove the currently selected image
      imageControl.patchValue(null);
      this.imageValues[index] = [];
    } else {
      // Use the first image for each card
      imageControl.patchValue(newImages[0]);
      this.imageValues[index] = newImages;
    }

    console.log(`Image updated for card ${index}:`, {
      newImages,
      formValue: imageControl.value
    });
  }

  getImageValue(index: number): Image[] {
    const image = this.menuCards.at(index).get('image')?.value;
    if (!image) {
      console.warn(`No image found for card ${index}`);
      return [];
    }
    // Ensure we're returning an array as ImageSelector expects
    return Array.isArray(image) ? image : [image];
  }

  // Submit entire repeater menu form
  onSubmit(): void {
    if (this.formGroup.valid) {
      const formValue = this.formGroup.value;
      
      // Create update object with proper image IDs
      const update = {
        ...formValue,
        menuCards: this.menuCards.controls.map((control, index) => ({
          title: control.get('title')?.value,
          route: control.get('route')?.value,
          buttonTitle: control.get('buttonTitle')?.value,
          image: control.get('image')?.value._id // Get just the ID
        }))
      };

      console.log('Submitting update:', update);

      this.componentService.updateRepeaterMenu(this.componentId, update).subscribe({
        next: () => {
          console.log('RepeaterMenu updated successfully');
        },
        error: (error: Error) => {
          console.error('Error updating RepeaterMenu:', error);
        }
      });
    } else {
      console.error('Form is invalid:', this.formGroup.errors);
    }
  }
}
