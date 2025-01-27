import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { AuthenticationService } from '../../services/authentication.service';
import { TypeIntro } from '../../interfaces/type-intro';
import { TypeIntroEditorComponent } from '../type-intro-editor/type-intro-editor.component';

@Component({
  selector: 'app-landing-editor',
  standalone: true,
  imports: [
    CommonModule,
    TypeIntroEditorComponent
  ],
  templateUrl: './landing-editor.component.html',
  styleUrl: './landing-editor.component.css'
})
export class LandingEditorComponent implements OnInit {
  typeIntroData!: TypeIntro;
  isLoggedIn = false;

  constructor(private apiService: ApiService, private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      this.loadData();
    }
  }

  loadData(): void {
    this.apiService.getTypeIntros().subscribe((data) => {
      this.typeIntroData = data[0];
    });
  }
}