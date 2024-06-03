import { ICardRepository } from '../../../domain/repositories/ICardRepository';

export class DeleteCardUseCase {
  constructor(private cardRepository: ICardRepository) {}

  async execute(id: string) {
    return this.cardRepository.deleteCard(id);
  }
}
