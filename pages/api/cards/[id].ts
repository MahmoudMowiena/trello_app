import { NextApiRequest, NextApiResponse } from 'next';
import { CardRepository } from '../../../infrastructure/repositories/CardRepository';
import { GetCardByIdUseCase } from '../../../application/useCases/card/GetCardByIdUseCase';
import { UpdateCardUseCase } from '../../../application/useCases/card/UpdateCardUseCase';
import { DeleteCardUseCase } from '../../../application/useCases/card/DeleteCardUseCase';
import { CardService } from '../../../application/services/CardService';
import { AddCardUseCase } from '@/application/useCases/card/AddCardUseCase';

const cardRepository = new CardRepository();
const getCardByIdUseCase = new GetCardByIdUseCase(cardRepository);
const addCardUseCase = new AddCardUseCase(cardRepository);
const updateCardUseCase = new UpdateCardUseCase(cardRepository);
const deleteCardUseCase = new DeleteCardUseCase(cardRepository);

const cardService = new CardService(
  getCardByIdUseCase,
  addCardUseCase,
  updateCardUseCase,
  deleteCardUseCase
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const card = await cardService.getCardById(`${id}`);
      if (!card) {
        return res.status(404).json({ error: 'Card not found' });
      }
      res.status(200).json(card);
    } catch (error) {
      console.error('Error retrieving card:', error);
      res.status(500).json({ error: 'Failed to retrieve card' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { title, description, columnId, imageFileName } = req.body;
      const updatedCard = await cardService.updateCard(`${id}`, { title, description, columnId, imageFileName });
      res.status(200).json(updatedCard);
    } catch (error) {
      console.error('Error updating card:', error);
      res.status(500).json({ error: 'Failed to update card' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const deletedCard = await cardService.deleteCard(`${id}`);
      res.status(200).json(deletedCard);
    } catch (error) {
      console.error('Error deleting card:', error);
      res.status(500).json({ error: 'Failed to delete card' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
