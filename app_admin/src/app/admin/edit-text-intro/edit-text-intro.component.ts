import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ComponentService } from '../../services/component.service';

@Component({
  selector: 'app-edit-text-intro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-text-intro.component.html',
  styleUrls: ['./edit-text-intro.component.css']
})
export class EditTextIntroComponent implements OnInit {
  @Input() formGroup!: FormGroup;   // WAS PUBLIC
  @Input() componentId!: string;

  constructor(private componentService: ComponentService) {}

  ngOnInit(): void {}

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