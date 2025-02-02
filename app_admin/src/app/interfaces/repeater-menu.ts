import { Image } from './image';

export interface RepeaterMenu {
  _id: string;
  title: string;
  description?: string;
  menuCards: MenuCard[];
  photoHeight?: number;
  photoWidth?: number;
  photoPaddingX?: number;
  photoPaddingY?: number;
  menuCardPaddingX?: number;
  createdAt: Date;
  updatedAt: Date;
  identifier: string;
  tags?: string[];
}

export interface MenuCard {
  title: string;
  image: Image;
  route: string;
}