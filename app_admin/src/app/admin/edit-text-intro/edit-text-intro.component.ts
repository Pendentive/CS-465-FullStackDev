import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-text-intro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-text-intro.component.html',
  styleUrls: ['./edit-text-intro.component.css']
})
export class EditTextIntroComponent implements OnInit {
  // Explicitly declare the input property as public.
  @Input() public formGroup!: FormGroup;

  constructor() {}

  ngOnInit(): void {}
}