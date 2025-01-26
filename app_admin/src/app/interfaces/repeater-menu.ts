import { Image } from './image';

export interface MenuCard {
  title: string;
  image: Image;
  route: string;
}

export interface RepeaterMenu {
  _id: string;
  menuCards: MenuCard[];
  photoHeight: number;
  photoWidth: number;
  photoPaddingX: number;
  photoPaddingY: number;
  menuCardPaddingX: number;
}