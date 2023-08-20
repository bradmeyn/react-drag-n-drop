export interface Card {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
  title?: string;
  detail?: string;
  priority: number;
  status: string;
  project?: Project;
  projectId?: number;
}

export interface Project {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
  name?: string;
  cards?: Card[];
  repository?: string;
  liveSite?: string;
  user?: User;
  userId?: number;
}

export interface User {
  id: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  projects?: Project[];
}
