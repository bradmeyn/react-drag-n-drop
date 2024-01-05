export type Card = {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
  title?: string;
  detail?: string;
  priority: number;
  status: string;
  project?: Project;
  projectId?: number;
};

export type Project = {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
  name?: string;
  cards?: Card[];
  repository?: string;
  liveSite?: string;
  user?: User;
  userId?: number;
};

export type User = {
  id: number;
  firstName?: string;
  lastName?: string;
  email: string;
  password?: string;
};
