import { NextApiRequest, NextApiResponse } from 'next';
import { getAllColumnsByBoardId, addColumn } from '../../../repositories/columnRepo'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const columns = await getAllColumnsByBoardId('1');
    res.status(200).json(columns);
  } else if (req.method === 'POST') {
    const { title, boardId } = req.body;
    const newColumn = await addColumn({ title, boardId })
    res.status(201).json(newColumn);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
