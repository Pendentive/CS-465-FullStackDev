import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TypeIntro } from '../../interfaces/type-intro';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-type-intro-editor',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './type-intro-editor.component.html',
  styleUrl: './type-intro-editor.component.css'
})
export class TypeIntroEditorComponent implements OnInit, OnChanges {
  @Input() data!: TypeIntro;
  form!: FormGroup;
  submitted = false;
  message: string = '';

  constructor(private fb: FormBuilder, private apiService: ApiService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      leftPadding: [0, Validators.required],
      width: [0, Validators.required],
      height: [0, Validators.required]
    });

    if (this.data) {
      this.form.patchValue(this.data);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      this.form.patchValue(this.data);
    }
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.valid) {
      this.apiService.updateTypeIntro(this.form.value).subscribe({
        next: (value: any) => {
          console.log(value);
          this.message = 'Type Intro updated successfully';
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        }
      });
    }
  }

  get f() {
    return this.form.controls;
  }
}