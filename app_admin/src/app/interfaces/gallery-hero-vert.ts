import { Image } from './image';

export interface GalleryHeroVert {
  _id: string;
  title: string;
  description?: string;
  images: Image[];
  padding?: number;
  width?: number;
  height?: number;
  createdAt: Date;
  updatedAt: Date;
  identifier: string;
  tags?: string[];
}