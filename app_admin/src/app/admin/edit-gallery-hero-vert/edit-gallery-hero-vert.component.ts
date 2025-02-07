import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-edit-gallery-hero-vert',
  standalone: true,
  imports: [],
  templateUrl: './edit-gallery-hero-vert.component.html',
  styleUrls: ['./edit-gallery-hero-vert.component.css']
})
export class EditGalleryHeroVertComponent {
  @Input() data: any;
}
