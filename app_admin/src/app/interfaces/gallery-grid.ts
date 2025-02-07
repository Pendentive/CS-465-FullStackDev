import { Image } from './image';

export interface GalleryGrid {
  _id: string;
  title: string;
  description?: string;
  images: Image[];
  createdAt: Date;
  updatedAt: Date;
  identifier: string;
  tags?: string[];
}