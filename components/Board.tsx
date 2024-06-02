import React, { useState, useEffect } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import Column from './Column';
import { ColumnData, CardData } from '../interfaces';

interface BoardProps {
  initialColumns: ColumnData[];
}

const Board: React.FC<BoardProps> = ({ initialColumns }) => {
  const [columns, setColumns] = useState<ColumnData[]>(initialColumns);

  const fetchColumns = async () => {
    try {
      const response = await fetch('/api/columns');
      const data: ColumnData[] = await response.json();
      setColumns(data);
    } catch (error) {
      console.error('Failed to load columns', error);
    }
  };

  useEffect(() => {
    fetchColumns();
  }, []);

  const handleAddColumn = async () => {
    const newColumn: any = {
      title: 'New Column',
      boardId: '1',
    };

    const response = await fetch('/api/columns', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newColumn),
    });

    if (response.status === 201) {
      const addedColumn: ColumnData = await response.json();
      setColumns((prevColumns) => [...prevColumns, addedColumn]);
    }
  };

  const handleUpdateColumn = async (columnId: string, newTitle: string) => {
    const existingColumn = columns.find((column) => column.id === columnId);

    if (existingColumn) {
      const updatedColumn = {
        ...existingColumn,
        title: newTitle,
      };

      setColumns((prevColumns) => prevColumns.map((column) => (column.id === columnId ? updatedColumn : column)));

      await fetch(`/api/columns/${columnId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedColumn),
      });
    }
  };

  const handleDeleteColumn = async (columnId: string) => {
    setColumns(prevColumns => prevColumns.filter(column => column.id !== columnId));

    await fetch(`/api/columns/${columnId}`, {
      method: 'DELETE',
    });
  };

  const handleAddCard = (newCard: CardData) => {
    setColumns(prevColumns =>
      prevColumns.map(column =>
        column.id === newCard.columnId
          ? {
              ...column,
              cards: [...column.cards, newCard],
            }
          : column
      )
    );
  };
  

  const updateColumnState = (card: CardData) => {
    setColumns(prevColumns =>
      prevColumns.map(column =>
        column.id === card.columnId
          ? {
            ...column,
            cards: column.cards.map(Card =>
              Card.id === card.id ? card : Card
            ),
          }
          : column
      )
    );
  }

  const handleUpdateCard = async (updatedCard: CardData) => {
    try {
      const response = await fetch(`/api/cards/${updatedCard.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCard),
      });

      if (response.status === 200) {
        const updatedCardData: CardData = await response.json();
        updateColumnState(updatedCardData);
      }
      return response.status;

    } catch (error) {
      console.error('Failed to update card:', error);
      return 500;
    }
  };

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId === destination.droppableId) return;

    const sourceColumnIndex = columns.findIndex(column => column.id === source.droppableId);
    const destColumnIndex = columns.findIndex(column => column.id === destination.droppableId);

    const sourceColumn = columns[sourceColumnIndex];
    const destColumn = columns[destColumnIndex];

    const movedCard = sourceColumn.cards[source.index];
    movedCard.columnId = destColumn.id;

    setColumns(prevColumns => {
      const updatedColumns = [...prevColumns];
      const sourceColumnIndex = updatedColumns.findIndex(
        column => column.id === source.droppableId
      );
      const destColumnIndex = updatedColumns.findIndex(
        column => column.id === destination.droppableId
      );

      updatedColumns[sourceColumnIndex] = {
        ...sourceColumn,
        cards: sourceColumn.cards.filter((_, index) => index !== source.index),
      };

      if (destColumn.cards == null || destColumn.cards.length == 0) {
        updatedColumns[destColumnIndex] = {
          ...destColumn,
          cards: [
            movedCard,
          ],
        };
      }
      else {
        updatedColumns[destColumnIndex] = {
          ...destColumn,
          cards: [
            ...destColumn.cards.slice(0, destination.index),
            movedCard,
            ...destColumn.cards.slice(destination.index),
          ],
        }
      };

      return updatedColumns;
    });

    const responseStatus = await handleUpdateCard(movedCard);
    if (responseStatus !== 200) {
      console.error('Failed to update card on the server');
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <section className="bg-blue-50 px-4 py-10">
        <div className="container-xl lg:container m-auto">
          <div className="flex overflow-x-auto px-4 py-4">
            {columns.map(column => (
              <Column
                key={column.id}
                column={column}
                onUpdateColumn={handleUpdateColumn}
                onDeleteColumn={handleDeleteColumn}
                onUpdateCard={handleUpdateCard} // Pass the handler with correct signature
                onAddCard={handleAddCard}
              />
            ))}
            <div onClick={handleAddColumn} className="w-72 flex-shrink-0 bg-white p-4 rounded-lg shadow-md mr-4 text-center cursor-pointer">
              + Add new column
            </div>
          </div>
        </div>
      </section>
    </DragDropContext>
  );
};

export default Board;
