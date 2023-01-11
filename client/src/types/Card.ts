import { Project } from './Project';

export interface Card {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  title?: string;
  detail?: string;
  status?: CardStatus;
  project?: Project;
  projectId?: number;
}

type CardStatus = 'To Do' | 'In Progress' | 'Completed';
