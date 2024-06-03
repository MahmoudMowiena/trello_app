import { NextApiRequest, NextApiResponse } from 'next';
import { ColumnRepository } from '../../../repositories/ColumnRepository';
import { GetAllColumnsByBoardIdUseCase } from '../../../application/useCases/column/GetAllColumnsByBoardIdUseCase';
import { AddColumnUseCase } from '../../../application/useCases/column/AddColumnUseCase';
import { ColumnService } from '../../../application/services/ColumnService';
import { UpdateColumnUseCase } from '@/application/useCases/column/UpdateColumnUseCase';
import { DeleteColumnUseCase } from '@/application/useCases/column/DeleteColumnUseCase';

const columnRepository = new ColumnRepository();
const getAllColumnsByBoardIdUseCase = new GetAllColumnsByBoardIdUseCase(columnRepository);
const addColumnUseCase = new AddColumnUseCase(columnRepository);
const updateColumnUseCase = new UpdateColumnUseCase(columnRepository);
const deleteColumnUseCase = new DeleteColumnUseCase(columnRepository);

const columnService = new ColumnService(
  getAllColumnsByBoardIdUseCase,
  addColumnUseCase,
  updateColumnUseCase,
  deleteColumnUseCase
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const columns = await columnService.getAllColumnsByBoardId('1');
      res.status(200).json(columns);
    } catch (error) {
      console.error('Error retrieving columns:', error);
      res.status(500).json({ error: 'Failed to retrieve columns' });
    }
  } else if (req.method === 'POST') {
    try {
      const { title, boardId } = req.body;
      const newColumn = await columnService.addColumn({ title, boardId });
      res.status(201).json(newColumn);
    } catch (error) {
      console.error('Error adding column:', error);
      res.status(500).json({ error: 'Failed to add column' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
