import { ICardRepository } from '@/domain/repositories/ICardRepository';
import prisma from '../prisma/prismaClient';
import { Card } from '@/domain/entities/Card';


export class CardRepository implements ICardRepository {

  async getCardById(id: string): Promise<Card | null> {
    return prisma.card.findUnique({
      where: { id },
    });
  };

  async addCard(newCard: { title: string; description: string; columnId: string; imageFileName: string | null }): Promise<Card> {
    return prisma.card.create({
      data: {
        title: newCard.title,
        description: newCard.description,
        columnId: newCard.columnId,
        imageFileName: newCard.imageFileName,
      },
    });
  };

  async updateCard(id: string, updatedCard: { title?: string; description?: string; columnId?: string; imageFileName?: string }): Promise<Card> {
    return prisma.card.update({
      where: { id },
      data: updatedCard,
    });
  };

  async deleteCard(id: string): Promise<Card> {
    return prisma.card.delete({
      where: { id },
    });
  };
}