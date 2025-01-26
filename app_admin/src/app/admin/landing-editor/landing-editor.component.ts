import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { GalleryHeroVert } from '../../interfaces/gallery-hero-vert';
import { TypeIntro } from '../../interfaces/type-intro';
import { GalleryBanner } from '../../interfaces/gallery-banner';
import { RepeaterMenu } from '../../interfaces/repeater-menu';

@Component({
  selector: 'app-landing-editor',
  standalone: true,
  templateUrl: './landing-editor.component.html',
  styleUrl: './landing-editor.component.css'
})
export class LandingEditorComponent implements OnInit {
  heroVertData!: GalleryHeroVert;
  typeIntroData!: TypeIntro;
  repeaterMenuData!: RepeaterMenu;
  galleryBannerData!: GalleryBanner;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.apiService.getGalleryHeroVerts().subscribe((data) => {
      this.heroVertData = data[0];
    });
    this.apiService.getTypeIntros().subscribe((data) => {
      this.typeIntroData = data[0];
    });
    this.apiService.getRepeaterMenus().subscribe((data) => {
      this.repeaterMenuData = data[0];
    });
    this.apiService.getGalleryBanners().subscribe((data) => {
      this.galleryBannerData = data[0];
    });
  }
}