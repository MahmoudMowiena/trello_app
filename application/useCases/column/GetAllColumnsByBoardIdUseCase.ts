import { IColumnRepository } from '../../../domain/repositories/IColumnRepository';

export class GetAllColumnsByBoardIdUseCase {
  constructor(private columnRepository: IColumnRepository) {}

  async execute(boardId: string) {
    return this.columnRepository.getAllColumnsByBoardId(boardId);
  }
}