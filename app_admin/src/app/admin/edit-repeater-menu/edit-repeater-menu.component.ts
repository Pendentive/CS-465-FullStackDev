import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder, FormArray, Validators } from '@angular/forms';
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
  menuCardForm!: FormGroup;
  currentImages: any[] = [];  // <-- will hold an array of images
  firstMenuCardFormGroup!: FormGroup;

  constructor(
    private componentService: ComponentService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.setComponentTitle();
    this.initializeMenuCardForm();
    // Sync currentImages with the form control value if present
    const imageValue = this.menuCardForm.get('image')?.value;
    this.currentImages = imageValue ? (Array.isArray(imageValue) ? imageValue : [imageValue]) : [];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formGroup']) {
      this.setComponentTitle();
      this.initializeMenuCardForm();
      const imageValue = this.menuCardForm.get('image')?.value;
      this.currentImages = imageValue ? (Array.isArray(imageValue) ? imageValue : [imageValue]) : [];
    }
  }

  private setComponentTitle(): void {
    this.componentTitle = this.formGroup.get('title')?.value || 'Edit Repeater Menu';
  }

  initializeMenuCardForm(): void {
    // Get the first menu card from the form group (use formGroup directly)
    const menuCards = this.formGroup.get('menuCards') as FormArray;
    if (menuCards && menuCards.length > 0) {
      // Get the first menu card form group
      this.firstMenuCardFormGroup = menuCards.at(0) as FormGroup;

      // Initialize the menuCardForm with the values from the first menu card
      this.menuCardForm = this.fb.group({
        title: [this.firstMenuCardFormGroup.get('title')?.value || '', Validators.required],
        // We're expecting an array for currentImages (even if it is one image)
        image: [this.firstMenuCardFormGroup.get('image')?.value || [], Validators.required],
        route: [this.firstMenuCardFormGroup.get('route')?.value || '', Validators.required],
        buttonTitle: [this.firstMenuCardFormGroup.get('buttonTitle')?.value || '', Validators.required]
      });

      this.currentImages = [this.menuCardForm.get('image')?.value];
    } else {
      // If there are no menu cards, create an empty form
      this.menuCardForm = this.fb.group({
        title: ['', Validators.required],
        image: [[], Validators.required],
        route: ['', Validators.required],
        buttonTitle: ['', Validators.required]
      });
      this.currentImages = [];
    }
  }

// At submission time, update the image control from currentImages
onSubmit(): void {
  // Patch the image control with the first image from the currentImages array.
  this.menuCardForm.patchValue({
    image: this.currentImages && this.currentImages.length > 0 ? this.currentImages[0] : null
  });

  if (this.menuCardForm.valid) {
    const menuCards = this.formGroup.get('menuCards') as FormArray;
    if (menuCards && menuCards.length > 0) {
      const firstMenuCard = menuCards.at(0) as FormGroup;
      firstMenuCard.patchValue(this.menuCardForm.value);
    }
  
    const update = { ...this.formGroup.value };
    this.componentService.updateRepeaterMenu(this.componentId, update).subscribe({
      next: () => {
        console.log('RepeaterMenu component updated successfully');
      },
      error: (error) => {
        console.error('Error updating RepeaterMenu component:', error);
      }
    });
  }
}
  
}