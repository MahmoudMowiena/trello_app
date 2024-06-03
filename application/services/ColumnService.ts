import { GetAllColumnsByBoardIdUseCase } from '../useCases/column/GetAllColumnsByBoardIdUseCase';
import { AddColumnUseCase } from '../useCases/column/AddColumnUseCase';
import { UpdateColumnUseCase } from '../useCases/column/UpdateColumnUseCase';
import { DeleteColumnUseCase } from '../useCases/column/DeleteColumnUseCase';

export class ColumnService {
  constructor(
    private getAllColumnsByBoardIdUseCase: GetAllColumnsByBoardIdUseCase,
    private addColumnUseCase: AddColumnUseCase,
    private updateColumnUseCase: UpdateColumnUseCase,
    private deleteColumnUseCase: DeleteColumnUseCase
  ) {}

  async getAllColumnsByBoardId(boardId: string) {
    return this.getAllColumnsByBoardIdUseCase.execute(boardId);
  }

  async addColumn(newColumn: { title: string; boardId: string }) {
    return this.addColumnUseCase.execute(newColumn);
  }

  async updateColumn(id: string, updatedColumn: { title?: string }) {
    return this.updateColumnUseCase.execute(id, updatedColumn);
  }

  async deleteColumn(id: string) {
    return this.deleteColumnUseCase.execute(id);
  }
}
