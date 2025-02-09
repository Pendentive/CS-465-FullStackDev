import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

import { ComponentService } from '../../services/component.service';

@Component({
  selector: 'app-edit-text-intro',
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
  templateUrl: './edit-text-intro.component.html',
  styleUrls: ['./edit-text-intro.component.css']
})
export class EditTextIntroComponent implements OnInit, OnChanges {
  @Input() formGroup!: FormGroup;
  @Input() componentId!: string;
  componentTitle: string = '';

  constructor(private componentService: ComponentService) {}

  ngOnInit(): void {
    this.setComponentTitle();
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

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.componentService.updateTypeIntro(this.componentId, this.formGroup.value).subscribe({
        next: () => {
          console.log('TypeIntro component updated successfully');
        },
        error: (error) => {
          console.error('Error updating TypeIntro component:', error);
        }
      });
    }
  }
}

// TODO: SOMETHING IS CITED ON PAGE