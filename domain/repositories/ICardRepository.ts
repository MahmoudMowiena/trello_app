import { Card } from '../entities/Card';

export interface ICardRepository {
  getCardById(id: string): Promise<Card | null>;
  addCard(newCard: { title: string; description: string; columnId: string; imageFileName: string | null }): Promise<Card>;
  updateCard(id: string, updatedCard: { title?: string; description?: string; columnId?: string; imageFileName?: string }): Promise<Card>;
  deleteCard(id: string): Promise<Card>;
}
