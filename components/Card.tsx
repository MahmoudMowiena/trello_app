import React, { useEffect, useState } from 'react';
import { CardData } from '../interfaces';
import { supabase } from '@/infrastructure/lib/supabase';

interface CardProps {
  card: CardData;
  onUpdateCard: (cardId: string, newTitle: string, newDescription: string, newImageName?: string) => void;
  onDeleteCard: (cardId: string) => void;
}

const Card: React.FC<CardProps> = ({ card, onUpdateCard, onDeleteCard }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(card.title);
  const [newDescription, setNewDescription] = useState(card.description);
  const [newImageName, setNewImageName] = useState(card.imageFileName);

  useEffect(() => {
    if (newImageName !== card.imageFileName) {
      handleUpdateCard();
    }
  }, [newImageName]);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleUpdateCard = () => {
    console.log(newImageName);

    onUpdateCard(card.id, newTitle, newDescription, newImageName);
    setIsEditing(false);
  };

  const handleDeleteCard = () => {
    onDeleteCard(card.id);
    setIsEditing(false);
    setMenuOpen(false);
  };

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let file: any = "";
    setMenuOpen(false);

    if (e.target.files) {
      file = e.target.files[0];
    }

    const { data, error } = await supabase.storage.from("cardsImages").upload(card.id + file.name, file as File);

    if (data) {
      setNewImageName(file.name);
    } else {
      console.log(error)
    }
  };

  return (
    <div className="relative bg-gray-100 p-4 rounded-lg shadow-md">
      {newImageName && (
        <div className="mb-2">
          <div className="flex flex-col items-center">
            <label className="cursor-pointer">
              <img
                src={`https://lqdmizxmdgfywuxmjqjm.supabase.co/storage/v1/object/public/cardsImages/${card.id + card.imageFileName}`}
                alt="Selected"
                className="w-full max-w-xs md:max-w-sm lg:max-w-md h-auto object-cover rounded-lg hover:opacity-75"
              />
              <input type="file" className="hidden" onChange={handleUploadImage} />
            </label>
          </div>
        </div>
      )}
      <div className="flex justify-between items-center mb-2">
        <h6 className="text-md font-semibold">{card.title}</h6>
        <div className="relative">
          <button onClick={handleMenuToggle} className="text-gray-500 hover:text-black transition-colors duration-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 12h.01M12 12h.01M18 12h.01"></path>
            </svg>

          </button>
          {menuOpen && (
            <div className="absolute right-4 top-2 mt-2 w-40 bg-white border rounded shadow-lg z-10">
              {!newImageName && (
                <label className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100" >
                  Add image
                  <input type="file" accept="image/*" className="hidden" onChange={handleUploadImage} />
                </label>
              )}
              <button onClick={() => { setIsEditing(true); setMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Edit</button>
              <button onClick={handleDeleteCard} className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100">Delete</button>
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
          <button onClick={handleUpdateCard} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
        </div>
      ) : (
        <>
          <p className="text-gray-500 mb-4">{card.description}</p>
        </>
      )}
    </div>

  );
};

export default Card;
