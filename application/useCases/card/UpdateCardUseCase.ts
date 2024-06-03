import { ICardRepository } from '../../../domain/repositories/ICardRepository';

export class UpdateCardUseCase {
  constructor(private cardRepository: ICardRepository) {}

  async execute(id: string, updatedCard: { title?: string; description?: string; columnId?: string; imageFileName?: string }) {
    return this.cardRepository.updateCard(id, updatedCard);
  }
}
