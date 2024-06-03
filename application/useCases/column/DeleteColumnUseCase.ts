import { IColumnRepository } from '../../../domain/repositories/IColumnRepository';

export class DeleteColumnUseCase {
  constructor(private columnRepository: IColumnRepository) {}

  async execute(id: string) {
    return this.columnRepository.deleteColumn(id);
  }
}
