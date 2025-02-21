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
  currentImages: Image[] = [];
  firstMenuCardFormGroup!: FormGroup;

  constructor(
    private componentService: ComponentService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.setComponentTitle();
    this.initializeMenuCardForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formGroup']) {
      this.setComponentTitle();
      this.initializeMenuCardForm();
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
        image: [this.firstMenuCardFormGroup.get('image')?.value || null, Validators.required],
        route: [this.firstMenuCardFormGroup.get('route')?.value || '', Validators.required],
        buttonTitle: [this.firstMenuCardFormGroup.get('buttonTitle')?.value || '', Validators.required]
      });

      this.currentImages = [this.menuCardForm.get('image')?.value];
    } else {
      // If there are no menu cards, create an empty form
      this.menuCardForm = this.fb.group({
        title: ['', Validators.required],
        image: [null, Validators.required],
        route: ['', Validators.required],
        buttonTitle: ['', Validators.required]
      });
      this.currentImages = [];
    }
  }

  onSubmit(): void {
    if (this.menuCardForm.valid) {
      // Update the first menu card in the form group with the values from the menuCardForm
      const menuCards = this.formGroup.get('menuCards') as FormArray;
      if (menuCards && menuCards.length > 0) {
        const firstMenuCard = menuCards.at(0) as FormGroup;
        firstMenuCard.patchValue(this.menuCardForm.value);
      }

      // Prepare the update object
      const update = {
        ...this.formGroup.value
      };

      // Call the component service to update the repeater menu
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