export interface User {
    email: string;
    name: string;
    role: 'admin' | 'editor' | 'express'; // could be string;
  }