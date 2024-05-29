import React, { useState } from 'react';

interface CardProps {
  card: {
    id: string;
    columnId: string;
    title: string;
    description: string;
    labels?: string[];
  };
  
  onUpdate: (columnId: string, cardId: string, newTitle: string, newDescription: string) => void;
  onDelete: (columnId: string, cardId: string) => void;
}

const Card: React.FC<CardProps> = ({ card, onUpdate, onDelete }) => {

  const [menuOpen, setMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(card.title);
  const [newDescription, setNewDescription] = useState(card.description);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleUpdate = () => {
    onUpdate(card.columnId, card.id, newTitle, newDescription);
    setIsEditing(false);
  };

  return (
    <div className="relative bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-2">
        <div className="flex space-x-1">
          {card.labels?.map((label, index) => (
            <span key={index} className={`block h-2 w-6 bg-${label}-500 rounded-full`}></span>
          ))}
        </div>
        <div className="relative">
          <button onClick={handleMenuToggle} className="text-gray-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v.01M12 12v.01M12 18v.01"></path>
            </svg>
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
              <button onClick={() => setIsEditing(true)} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Update</button>
              <button onClick={() => onDelete(card.columnId, card.id)} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Delete</button>
            </div>
          )}
        </div>
      </div>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="mb-2 w-full p-2 border border-gray-300 rounded"
          />
          <textarea
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            className="mb-2 w-full p-2 border border-gray-300 rounded"
          />
          <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
        </div>
      ) : (
        <>
          <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
          <p className="text-gray-600 mb-4">{card.description}</p>
          <div className="flex justify-between items-center"> </div>
        </>
      )}
    </div>
  );
};

export default Card;