import { Image } from './image';

export interface GalleryBanner {
  _id: string;
  title: string;
  description: string;
  images: Image[];
  photoEdgeLength: number;
  barHeight: number;
}