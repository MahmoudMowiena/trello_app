import { ICardRepository } from '../../../domain/repositories/ICardRepository';

export class GetCardByIdUseCase {
  constructor(private cardRepository: ICardRepository) {}

  async execute(id: string) {
    return this.cardRepository.getCardById(id);
  }
}
