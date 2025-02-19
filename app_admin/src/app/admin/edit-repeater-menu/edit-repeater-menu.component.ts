import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormArray, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ComponentService } from '../../services/component.service';

import { ImageSelectorComponent } from '../../components/image-selector/image-selector.component'; // Import ImageSelectorComponent
import { Image } from '../../interfaces/image';

@Component({
  selector: 'app-edit-repeater-menu',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ImageSelectorComponent
  ],
  templateUrl: './edit-repeater-menu.component.html'
})
export class EditRepeaterMenuComponent implements OnInit, OnChanges {
  @Input() formGroup!: FormGroup;
  @Input() componentId!: string;
  componentTitle: string = '';
  currentImages: string[] = []; // Array to hold current image IDs

  constructor(private componentService: ComponentService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.setComponentTitle();
    this.loadCurrentImages();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formGroup']) {
      this.setComponentTitle();
    }
  }

  private setComponentTitle(): void {
    if (this.formGroup && this.formGroup.get('kind')?.value) {
      this.componentTitle = this.formGroup.get('kind')?.value + ' Component';
    } else {
      this.componentTitle = 'Component';
    }
  }

  loadCurrentImages(): void {
    // Load current images from the form group
    const menuCards = this.formGroup.get('data.menuCards')?.value;
    if (menuCards && Array.isArray(menuCards)) {
      this.currentImages = menuCards.map((card: any) => card.image);
    }
  }

  get menuCards(): FormArray {
    return this.formGroup.get('data.menuCards') as FormArray;
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.componentService.updateRepeaterMenu(this.componentId, this.formGroup.value).subscribe({
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
