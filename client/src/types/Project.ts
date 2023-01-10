import { Card } from './Card';

export interface Project {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  cards: Card[];
  repository?: string;
  liveSite?: string;
}
