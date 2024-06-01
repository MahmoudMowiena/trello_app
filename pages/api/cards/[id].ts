import { NextApiRequest, NextApiResponse } from 'next';
import { getCardById, updateCard, deleteCard } from '../../../repositories/cardRepo'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const card = await getCardById(`${id}`);
      if (!card) {
        return res.status(404).json({ error: 'Card not found' });
      }
      res.status(200).json(card);
      
  } else if (req.method === 'PUT') {
      const { title, description, columnId } = req.body;
      const updatedCard = await updateCard(`${id}`,{title, description, columnId})
      res.status(200).json(updatedCard);

  } else if (req.method === 'DELETE') {
      const deletedCard = await deleteCard(`${id}`);
      res.status(200).json(deletedCard);
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
