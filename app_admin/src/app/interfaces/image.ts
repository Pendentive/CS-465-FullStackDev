export interface Image {
    _id: string;
    filename: string;
    path: string;
    category: string;
    metadata: {
      width: number;
      height: number;
      size: number;
      dateCreated: Date;
    };
    alt: string;
    title: string;
    description: string;
  }