import { Component, Input, OnInit } from '@angular/core';
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
import { MenuCard } from '../../interfaces/repeater-menu';

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
export class EditRepeaterMenuComponent implements OnInit {
  @Input() formGroup!: FormGroup;
  @Input() componentId!: string;

  // Removed the separate imageValues array
  componentTitle: string = '';

  constructor(
    private componentService: ComponentService,
    private fb: FormBuilder
  ) {}

  // Helper getter to iterate over `menuCards` in the template
  get menuCards(): FormArray {
    return this.formGroup.get('menuCards') as FormArray;
  }

  ngOnInit(): void {
    this.setComponentTitle();
    // Since the parent provides the form data, no need to fetch or process further
    console.log('Initial RepeaterMenu data:', this.formGroup.value);
  }

  private setComponentTitle(): void {
    this.componentTitle =
      this.formGroup.get('title')?.value || 'Edit Repeater Menu';
  }

  // Called when the user picks images from <app-image-selector>
  onImagesChange(newImages: Image[], index: number): void {
    const imageControl = this.menuCards.at(index).get('image');
    if (!imageControl) return;
    // If no images, remove the selected image by setting to null
    if (newImages.length === 0) {
      imageControl.patchValue(null);
    } else {
      // Otherwise, use the first image
      imageControl.patchValue(newImages[0]);
    }
  }

  getImageValue(index: number): Image[] {
    const image = this.menuCards.at(index).get('image')?.value;
    if (!image) return [];
    return Array.isArray(image) ? image : [image];
  }

  // Submit entire repeater menu form (no deep copy needed; just map the final values)
  onSubmit(): void {
    if (this.formGroup.valid) {
      const update = {
        ...this.formGroup.value,
        menuCards: this.menuCards.controls.map(control => ({
          title: control.get('title')?.value,
          route: control.get('route')?.value,
          buttonTitle: control.get('buttonTitle')?.value,
          // Extract just the image ID for the update payload
          image: control.get('image')?.value?._id
        }))
      };

      console.log('Submitting RepeaterMenu update:', update);

      this.componentService.updateRepeaterMenu(this.componentId, update).subscribe({
        next: () => {
          console.log('RepeaterMenu updated successfully');
        },
        error: (error) => {
          console.error('Error updating RepeaterMenu:', error);
        }
      });
    } else {
      console.error('Form is invalid:', this.formGroup.errors);
    }
  }
}
