import { IColumnRepository } from '../../../domain/repositories/IColumnRepository';

export class AddColumnUseCase {
  constructor(private columnRepository: IColumnRepository) {}

  async execute(newColumn: { title: string; boardId: string }) {
    return this.columnRepository.addColumn(newColumn);
  }
}