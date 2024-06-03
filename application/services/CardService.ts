import { GetCardByIdUseCase } from '../useCases/card/GetCardByIdUseCase';
import { AddCardUseCase } from '../useCases/card/AddCardUseCase';
import { UpdateCardUseCase } from '../useCases/card/UpdateCardUseCase';
import { DeleteCardUseCase } from '../useCases/card/DeleteCardUseCase';

export class CardService {
  constructor(
    private getCardByIdUseCase: GetCardByIdUseCase,
    private addCardUseCase: AddCardUseCase,
    private updateCardUseCase: UpdateCardUseCase,
    private deleteCardUseCase: DeleteCardUseCase
  ) {}

  async getCardById(id: string) {
    return this.getCardByIdUseCase.execute(id);
  }

  async addCard(newCard: { title: string; description: string; columnId: string; imageFileName: string | null }) {
    return this.addCardUseCase.execute(newCard);
  }

  async updateCard(id: string, updatedCard: { title?: string; description?: string; columnId?: string; imageFileName?: string }) {
    return this.updateCardUseCase.execute(id, updatedCard);
  }

  async deleteCard(id: string) {
    return this.deleteCardUseCase.execute(id);
  }
}
