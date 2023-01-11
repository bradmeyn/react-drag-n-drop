import { type Card } from '../types/Card';
import { type Project } from '../types/Project';
import { type User } from '../types/User';

export const testUser: User = {
  id: 1,
  firstName: 'Brad',
  lastName: 'Meyn',
  email: 'brad@mail.com',
};

const testCards: Card[] = [
  {
    id: 1,
    title: 'User Authentication',
    detail: 'Add the ability for users to register & login',
    status: 'To Do',
    // project: testProject,
  },
  {
    id: 2,
    title: 'UI Design',
    detail: 'Add board and card ui with drag n drop',
    status: 'In Progress',
    // project: testProject,
  },
];

export const testProject: Project = {
  id: 1,
  name: 'Workshop',
  user: testUser,
  userId: 1,
  cards: testCards,
};
