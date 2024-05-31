import { NextApiRequest, NextApiResponse } from 'next';
import { getColumnById, updateColumn, deleteColumn } from '../../../repositories/columnRepo'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const column = await getColumnById(`${id}`);
      if (!column) {
        return res.status(404).json({ error: 'Column not found' });
      }
      res.status(200).json(column);
      
  } else if (req.method === 'PUT') {
      const { title } = req.body;
      const updatedColumn = await updateColumn(`${id}`,{title})
      res.status(200).json(updatedColumn);

  } else if (req.method === 'DELETE') {
      const deletedColumn = await deleteColumn(`${id}`);
      res.status(200).json(deletedColumn);
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
