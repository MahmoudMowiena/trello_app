import prisma from '../prisma/prismaClient';

export const getAllCards = async () => {
  return prisma.card.findMany();
};

export const getAllCardsByColumnId = async (columnId: string) => {
    return prisma.card.findMany({
      where: { columnId },
    });
  };

export const getCardById = async (id: string) => {
  return prisma.card.findUnique({
    where: { id },
  });
};

export const addCard = async (newCard: {
  title: string;
  description: string;
  columnId: string;
  imageFileName: string | null
}) => {
  return prisma.card.create({
    data: {
      title: newCard.title,
      description: newCard.description,
      columnId: newCard.columnId,
      imageFileName: newCard.imageFileName,
    },
  });
};

export const updateCard = async (
  id: string,
  updatedCard: { title?: string; description?: string; columnId?: string; imageFileName?: string}
) => {
  return prisma.card.update({
    where: { id },
    data: updatedCard,
  });
};

export const deleteCard = async (id: string) => {
  return prisma.card.delete({
    where: { id },
  });
};