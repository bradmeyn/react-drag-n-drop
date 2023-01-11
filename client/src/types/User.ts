import type { Project } from './Project';

export interface User {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  projects?: Project[];
}
