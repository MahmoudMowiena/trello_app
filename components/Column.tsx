import React, { useState, useEffect } from 'react';
import Card from './Card';
import { CardData } from '../interfaces';
import { getAllCards, addCard, updateCard, deleteCard } from '@/repositories/cardRepo';

interface ColumnProps {
  column: {
    id: string;
    title: string;
  };
}

const Column: React.FC<ColumnProps> = ({ column }) => {
  const [cards, setCards] = useState<CardData[]>([]);

  useEffect(() => {
    const fetchCards = async () => {
      const allCards = await getAllCards();
      const columnCards = allCards.filter(card => card.columnId === column.id);
      setCards(columnCards);
    };

    fetchCards();
  }, [column.id]);

  const handleAddCard = async () => {
    const newCard: CardData = {
      id: `card-${Date.now()}`,
      columnId: column.id,
      title: 'New Card Title',
      description: 'New card description',
      labels: []
    };

    setCards(prevCards => [...prevCards, newCard]);
    await addCard(newCard);
  };

  const handleUpdateCard = async (columnId: string, cardId: string, newTitle: string, newDescription: string) => {
    const existingCard = cards.find(card => card.id === cardId);

    if (existingCard) {
      const updatedCard = {
        ...existingCard,
        title: newTitle,
        description: newDescription
      };

      setCards(prevCards => prevCards.map(card => (card.id === cardId ? updatedCard : card)));

      await updateCard(cardId, updatedCard);
    }
  };

  const handleDeleteCard = async (columnId: string, cardId: string) => {
    setCards(prevCards => prevCards.filter(card => card.id !== cardId));

    await deleteCard(cardId);
  };

  return (
    <div className="w-72 flex-shrink-0 bg-gray-100 p-4 rounded-lg shadow-md mr-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">{column.title}</h2>
        <button className="text-gray-500">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <div className="space-y-4">
        {cards.map(card => (
          <Card
            key={card.id}
            card={card}
            onUpdate={handleUpdateCard}
            onDelete={handleDeleteCard}
          />
        ))}
        <button onClick={handleAddCard} className="bg-gray-200 p-4 rounded-lg text-center text-gray-600 cursor-pointer hover:bg-gray-300">
          + Add new card
        </button>
      </div>
    </div>
  );
};

export default Column;