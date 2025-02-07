import { GalleryHeroVert } from './gallery-hero-vert';
import { TypeIntro } from './type-intro';
import { RepeaterMenu } from './repeater-menu';
import { GalleryBanner } from './gallery-banner';
import { GalleryGrid } from './gallery-grid';

export interface Page {
  _id: string;
  title: string;
  description?: string;
  components: (GalleryHeroVert | TypeIntro | RepeaterMenu | GalleryBanner | GalleryGrid)[];
  createdAt: Date;
  updatedAt: Date;
}