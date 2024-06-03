import { ICardRepository } from '../../../domain/repositories/ICardRepository';

export class AddCardUseCase {
  constructor(private cardRepository: ICardRepository) {}

  async execute(newCard: { title: string; description: string; columnId: string; imageFileName: string | null }) {
    return this.cardRepository.addCard(newCard);
  }
}
