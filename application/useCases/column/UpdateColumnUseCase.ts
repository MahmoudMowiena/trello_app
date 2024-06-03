import { IColumnRepository } from '../../../domain/repositories/IColumnRepository';

export class UpdateColumnUseCase {
  constructor(private columnRepository: IColumnRepository) {}

  async execute(id: string, updatedColumn: { title?: string }) {
    return this.columnRepository.updateColumn(id, updatedColumn);
  }
}
