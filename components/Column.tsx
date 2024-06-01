import React, { useEffect, useState } from 'react';
import { Droppable, Draggable, DraggableProvided, DroppableProvided, DropResult } from 'react-beautiful-dnd';
import Card from './Card';
import { ColumnData, CardData } from '../interfaces';

interface ColumnProps {
  column: ColumnData;
  onUpdateCard: (updatedCard: CardData) => Promise<number>;
}

const Column: React.FC<ColumnProps> = ({ column, onUpdateCard }) => {
  const [cards, setCards] = useState<CardData[]>(column.cards);

  useEffect(() => {
    setCards(column.cards);
  }, [column.cards]);

  const handleAddCard = async () => {
    const newCard: any = {
      columnId: column.id,
      title: 'New Card Title',
      description: 'New card description',
    };

    const response = await fetch('/api/cards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCard),
    });

    if (response.status === 201) {
      const addedCard: CardData = await response.json();
      setCards(prevCards => [...prevCards, addedCard]);
    }
  };

  const handleUpdateCardLocally = (cardId: string, updatedCardData: Partial<CardData>) => {
    setCards(prevCards =>
      prevCards.map(card =>
        card.id === cardId ? { ...card, ...updatedCardData } : card
      )
    );
  };

  const handleUpdateCardWrapper = async (cardId: string, newTitle: string, newDescription: string) => {
    const existingCard = cards.find(card => card.id === cardId);

    if (existingCard) {
      const updatedCardData = {
        ...existingCard,
        title: newTitle,
        description: newDescription,
      };

      handleUpdateCardLocally(cardId, updatedCardData);
      await onUpdateCard(updatedCardData);
    }
  };

  const handleDeleteCard = async (cardId: string) => {
    setCards(prevCards => prevCards.filter(card => card.id !== cardId));

    await fetch(`/api/cards/${cardId}`, {
      method: 'DELETE',
    });
  };

  return (
    <Droppable droppableId={column.id}>
      {(provided: DroppableProvided) => (
        <div
          className="w-72 flex-shrink-0 bg-gray-100 p-4 rounded-lg shadow-md mr-4"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">{column.title}</h2>
            <button className="text-gray-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div className="space-y-4">
            {cards?.map((card, index) => (
              <Draggable key={card.id} draggableId={card.id} index={index}>
                {(provided: DraggableProvided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Card
                      key={card.id}
                      card={card}
                      onUpdate={(title, description) => handleUpdateCardWrapper(card.id, title, description)}
                      onDelete={() => handleDeleteCard(card.id)}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            <button onClick={handleAddCard} className="bg-gray-200 p-4 rounded-lg text-center text-gray-600 cursor-pointer hover:bg-gray-300">
              + Add new card
            </button>
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default Column;
