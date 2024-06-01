import { NextApiRequest, NextApiResponse } from 'next';
import { getAllCardsByColumnId, addCard, updateCard, deleteCard, getCardById } from '@/repositories/cardRepo';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const cards = await getAllCardsByColumnId('1');
    res.status(200).json(cards);
  } else if (req.method === 'POST') {
    const { title, description, columnId, labels } = req.body;
    const newCard = await addCard({ title, description, columnId });
    res.status(201).json(newCard);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`); 
  }
}
