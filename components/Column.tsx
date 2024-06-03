import React, { useEffect, useState } from 'react';
import { Droppable, Draggable, DraggableProvided, DroppableProvided, DropResult } from 'react-beautiful-dnd';
import Card from './Card';
import { CardData, ColumnData } from '../interfaces';


interface ColumnProps {
  column: ColumnData;
  onAddCard: (addedCard: CardData) => void;
  onUpdateCard: (updatedCard: CardData) => Promise<number>;
  onUpdateColumn: (cardId: string, newTitle: string) => void;
  onDeleteColumn: (cardId: string) => void;
}

const Column: React.FC<ColumnProps> = ({ column, onAddCard, onUpdateCard, onUpdateColumn, onDeleteColumn }) => {
  const [cards, setCards] = useState<CardData[]>(column.cards);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(column.title);


  useEffect(() => {
    setCards(column.cards);
  }, [column.cards]);

  const handleAddCard = async () => {
    const newCard: any = {
      columnId: column.id,
      title: 'New Card Title',
      description: 'New card description',
      imageFileName: null
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
      setCards(prevCards =>
        prevCards
          ? [...prevCards, addedCard]
          : [addedCard]
      );
            onAddCard(addedCard);
    }
  };

  const handleUpdateCardLocally = (cardId: string, updatedCardData: CardData) => {
    setCards(prevCards =>
      prevCards.map(card =>
        card.id == cardId ? { ...card, ...updatedCardData } : card
      )
    );
  };

  const handleUpdateCardWrapper = async (cardId: string, newTitle: string, newDescription: string, newImageFileName?: string) => {
    const existingCard = cards.find(card => card.id === cardId);

    if (existingCard) {
      const updatedCardData = {
        ...existingCard,
        title: newTitle,
        description: newDescription,
        imageFileName: newImageFileName,
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

  const handleUpdateColumn = () => {
    onUpdateColumn(column.id, newTitle);
    setIsEditing(false);
  };

  const handleDeleteColumn = () => {
    onDeleteColumn(column.id);
    setIsEditing(false);
    setMenuOpen(false);
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Droppable droppableId={column.id}>
  {(provided: DroppableProvided) => (
    <div
      className="w-72 flex-shrink-0 bg-white p-4 rounded-lg relative"
      ref={provided.innerRef}
      {...provided.droppableProps}
    >
      <div className="bg-gray-100 rounded-lg shadow-md flex justify-between items-center mb-4 relative">
        {isEditing ? (
          <div>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="mb-2 w-full p-2 border border-gray-300 rounded"
            />
            <button
              onClick={handleUpdateColumn}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200 ease-in-out mr-2"
            >
              Save
            </button>
          </div>
        ) : (
          <div className="py-2 px-4">
            <h4 className="text-md font-semibold">{column.title}</h4>
          </div>
        )}
        <div className="py-2 px-2">
          <button
            onClick={handleMenuToggle}
            className="text-gray-500 hover:text-black transition-colors duration-200"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 12h.01M12 12h.01M18 12h.01"></path>
            </svg>
          </button>
        </div>
        {menuOpen && (
          <div className="absolute right-6 top-4 mt-2 w-40 bg-white border rounded shadow-lg z-10">
            <button
              onClick={() => { setIsEditing(true); setMenuOpen(false); }}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Edit
            </button>
            <button
              onClick={handleDeleteColumn}
              className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        )}
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
                  onUpdateCard={handleUpdateCardWrapper}
                  onDeleteCard={handleDeleteCard}
                />
              </div>
            )}
          </Draggable>
        ))}
        {provided.placeholder}
        <button
          onClick={handleAddCard}
          className="w-full bg-white p-4 rounded-lg text-center text-gray-600 cursor-pointer border-2 border-dashed border-gray-300 hover:bg-gray-100"
          style={{ height: '7rem' }}
        >
          + Add new card
        </button>
      </div>
    </div>
  )}
</Droppable>

  );
};

export default Column;

