import { Card } from './Card';
import { User } from './User';

export interface Project {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  name?: string;
  cards?: Card[];
  repository?: string;
  liveSite?: string;
  user?: User;
  userId?: number;
}
