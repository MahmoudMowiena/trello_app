import { IColumnRepository } from '@/domain/repositories/IColumnRepository';
import prisma from '../prisma/prismaClient';
import { Column } from '@/domain/entities/Column';
import { Card } from '@/domain/entities/Card';


export class ColumnRepository implements IColumnRepository {

  async getAllColumnsByBoardId(boardId: string): Promise<any> {
    return prisma.column.findMany({
      where: { boardId },
      include: {
        cards: true,
      },
    });
  };

  async addColumn(newColumn: { title: string; boardId: string }): Promise<Column> {
    return prisma.column.create({
      data: {
        title: newColumn.title,
        boardId: newColumn.boardId,
      },
    });
  };

  async updateColumn(id: string, updatedColumn: { title?: string }): Promise<Column> {
    return prisma.column.update({
      where: { id },
      data: updatedColumn,
    });
  };

  async deleteColumn(id: string): Promise<Column> {
    const columnCards: Card[] = await prisma.card.findMany({
      where: { columnId: id },
    });

    await Promise.all(columnCards?.map(async (card) => {
      await prisma.card.delete({
        where: { id: card.id },
      });
    }));

    return prisma.column.delete({
      where: { id },
    });
  }
}
