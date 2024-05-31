import prisma from '../prisma/prismaClient';

export const getAllColumns = async () => {
  return prisma.column.findMany({
    include: {
      cards: true,
    },
  });
};

export const getAllColumnsByBoardId = async (boardId: string) => {
    return prisma.column.findMany({
      where: { boardId },
      include: {
        cards: true,
      },
    });
  };

export const getColumnById = async (id: string) => {
  return prisma.column.findUnique({
    where: { id },
    include: {
      cards: true,
    },
  });
};

export const addColumn = async (newColumn: { title: string; boardId: string }) => {
  return prisma.column.create({
    data: {
      title: newColumn.title,
      boardId: newColumn.boardId,
    },
  });
};

export const updateColumn = async (id: string, updatedColumn: { title?: string }) => {
  return prisma.column.update({
    where: { id },
    data: updatedColumn,
  });
};

export const deleteColumn = async (id: string) => {
  return prisma.column.delete({
    where: { id },
  });
};
