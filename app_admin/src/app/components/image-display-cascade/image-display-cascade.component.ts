import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageUrlService } from '../../services/image-url.service';

import { MatGridListModule } from '@angular/material/grid-list'; // Import MatGridListModule

import { Image } from '../../interfaces/image';

@Component({
  selector: 'image-display-cascade',
  standalone: true,
  imports: [CommonModule, 
    MatGridListModule
  ],
  templateUrl: './image-display-cascade.component.html',
  styleUrls: ['./image-display-cascade.component.css'],
  providers: [ImageUrlService] // Provide the service
})
export class ImageDisplayCascadeComponent {
  @Input() images: Image[] = [];
  @Input() columns: number = 2;

  constructor(public imageUrlService: ImageUrlService) {} // Inject the service
}
