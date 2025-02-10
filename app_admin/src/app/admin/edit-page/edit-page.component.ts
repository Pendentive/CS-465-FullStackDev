import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-edit-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './edit-page.component.html'
})
export class EditPageComponent implements OnInit, OnChanges {
  @Input() formGroup!: FormGroup;
  @Input() pageId!: string;
  @Input() title!: string;
  @Input() description!: string;
  pageForm!: FormGroup;
  componentTitle: string = 'Edit Page Details';

  constructor(private apiService: ApiService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.pageForm = this.fb.group({
      title: [this.title, Validators.required],
      description: [this.description]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['title'] || changes['description']) {
      this.pageForm.patchValue({
        title: this.title,
        description: this.description
      });
    }
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.apiService.updatePage(this.pageId, this.formGroup.value).subscribe({
        next: () => {
          console.log('Page updated successfully');
        },
        error: (error) => {
          console.error('Error updating page:', error);
        }
      });
    }
  }
}
