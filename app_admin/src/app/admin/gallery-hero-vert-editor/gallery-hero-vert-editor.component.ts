import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { GalleryHeroVert } from '../../interfaces/gallery-hero-vert';

@Component({
  selector: 'app-gallery-hero-vert-editor',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './gallery-hero-vert-editor.component.html',
  styleUrl: './gallery-hero-vert-editor.component.css'
})
export class GalleryHeroVertEditorComponent implements OnInit {
  @Input() data!: GalleryHeroVert;
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [this.data.title, Validators.required],
      description: [this.data.description],
      images: [this.data.images],
      padding: [this.data.padding, Validators.required],
      width: [this.data.width, Validators.required],
      height: [this.data.height, Validators.required]
    });
  }
}