import { Project } from './Project';

export interface Card {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  title?: string;
  detail?: string;
  status?: string;
  project?: Project;
  projectId?: number;
}
