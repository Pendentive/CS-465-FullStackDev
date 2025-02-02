export interface TypeIntro {
  _id: string;
  title: string;
  description?: string;
  leftPadding: number;
  width: number;
  height: number;
  createdAt: Date;
  updatedAt: Date;
  identifier: string;
  tags?: string[];
}