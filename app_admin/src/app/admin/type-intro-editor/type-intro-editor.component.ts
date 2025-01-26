import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypeIntro } from '../../interfaces/type-intro';

@Component({
  selector: 'app-type-intro-editor',
  standalone: true,
  templateUrl: './type-intro-editor.component.html',
  styleUrl: './type-intro-editor.component.css'
})
export class TypeIntroEditorComponent implements OnInit {
  @Input() data!: TypeIntro;
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [this.data.title, Validators.required],
      description: [this.data.description],
      leftPadding: [this.data.leftPadding, Validators.required],
      width: [this.data.width, Validators.required],
      height: [this.data.height, Validators.required]
    });
  }
}