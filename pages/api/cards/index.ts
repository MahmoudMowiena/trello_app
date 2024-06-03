import { NextApiRequest, NextApiResponse } from 'next';
import { CardRepository } from '../../../infrastructure/repositories/CardRepository';
import { AddCardUseCase } from '../../../application/useCases/card/AddCardUseCase';
import { CardService } from '../../../application/services/CardService';
import { GetCardByIdUseCase } from '@/application/useCases/card/GetCardByIdUseCase';
import { UpdateCardUseCase } from '@/application/useCases/card/UpdateCardUseCase';
import { DeleteCardUseCase } from '@/application/useCases/card/DeleteCardUseCase';

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
  if (req.method === 'POST') {
    const { title, description, columnId, imageFileName } = req.body;
    const newCard = await cardService.addCard({ title, description, columnId, imageFileName });
    res.status(201).json(newCard);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
