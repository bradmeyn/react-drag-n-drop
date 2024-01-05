import { Card } from "./types";
import { nanoid } from "nanoid";

export const homeCards: Card[] = [
  {
    id: nanoid(),
    priority: 1,
    title: "User Authentication",
    detail: "Add the ability for users to register & login",
    status: "To Do",
  },
  {
    id: nanoid(),
    priority: 1,
    title: "UI Design",
    detail: "Add board and card ui with drag n drop",
    status: "In Progress",
  },
  {
    id: nanoid(),
    priority: 2,
    title: "Data Persistence",
    detail: "Link frontend to backend and use database",
    status: "To Do",
  },
  {
    id: nanoid(),
    priority: 1,
    title: "Basic Board Design",
    detail: "Create a basic board layout with list categories and cards",
    status: "Completed",
  },
  {
    id: nanoid(),
    priority: 3,
    title: "Create New Projects",
    detail: "Add the ability to create new projectgs",
    status: "To Do",
  },
];
