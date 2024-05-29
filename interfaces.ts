export interface ColumnData {
  id: string;
  title: string;
  //cards: CardData[];
}

export interface CardData {
  id: string;
  columnId: string;
  title: string;
  description: string;
  labels: string[];
}