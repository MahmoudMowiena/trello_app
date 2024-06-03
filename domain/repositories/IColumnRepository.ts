import { Column } from '../entities/Column';

export interface IColumnRepository {
  getAllColumnsByBoardId(boardId: string): Promise<any>;
  addColumn(newColumn: { title: string; boardId: string }): Promise<Column>;
  updateColumn(id: string, updatedColumn: { title?: string }): Promise<Column>;
  deleteColumn(id: string): Promise<Column>;
}