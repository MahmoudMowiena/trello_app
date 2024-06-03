import { NextApiRequest, NextApiResponse } from 'next';
import { ColumnRepository } from '../../../infrastructure/repositories/ColumnRepository';
import { UpdateColumnUseCase } from '../../../application/useCases/column/UpdateColumnUseCase';
import { DeleteColumnUseCase } from '../../../application/useCases/column/DeleteColumnUseCase';
import { ColumnService } from '../../../application/services/ColumnService';
import { AddColumnUseCase } from '@/application/useCases/column/AddColumnUseCase';
import { GetAllColumnsByBoardIdUseCase } from '@/application/useCases/column/GetAllColumnsByBoardIdUseCase';

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
  const { id } = req.query;

  if (req.method === 'PUT') {
    try {
      const { title } = req.body;
      const updatedColumn = await columnService.updateColumn(`${id}`, { title });
      res.status(200).json(updatedColumn);
    } catch (error) {
      console.error('Error updating column:', error);
      res.status(500).json({ error: 'Failed to update column' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const deletedColumn = await columnService.deleteColumn(`${id}`);
      res.status(200).json(deletedColumn);
    } catch (error) {
      console.error('Error deleting column:', error);
      res.status(500).json({ error: 'Failed to delete column' });
    }
  } else {
    res.setHeader('Allow', ['PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
