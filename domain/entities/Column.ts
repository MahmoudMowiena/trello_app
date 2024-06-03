import { Card } from "./Card";

export interface Column {
    id: string;
    title: string;
    boardId: string;
    cards?: Card[];
  }