import React, { useState, useEffect, useCallback } from 'react';
import Card from './Card';
import { ColumnData, CardData } from '../interfaces';

interface ColumnProps {
  column: ColumnData;
}

  const Column: React.FC<ColumnProps> = ({ column }) => {

  const [cards, setCards] = useState<CardData[]>(column.cards);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch(`/api/columns/${column.id}`);
        const fetchedColumn: ColumnData = await response.json();
        setCards(fetchedColumn.cards);
      } catch (error) {
        console.error('Failed to load cards', error);
      }
    };

    fetchCards();
  }, [column.id]);


  const handleAddCard = async () => {
    const newCard: any = {
      columnId: column.id,
      title: 'New Card Title',
      description: 'New card description',
    };

    setCards((prevCards) => [...prevCards, newCard]);

    await fetch('/api/cards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCard),
    });
  };

  const handleUpdateCard = async (cardId: string, newTitle: string, newDescription: string) => {
    const existingCard = cards.find((card) => card.id === cardId);

    if (existingCard) {
      const updatedCard = {
        ...existingCard,
        title: newTitle,
        description: newDescription,
      };

      setCards((prevCards) => prevCards.map((card) => (card.id === cardId ? updatedCard : card)));

      await fetch(`/api/cards/${cardId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCard),
      });
    }
  };

  const handleDeleteCard = async (cardId: string) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));

    await fetch(`/api/cards/${cardId}`, {
      method: 'DELETE',
    });
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
        {cards.map((card) => (
          <Card key={card.id} card={card} onUpdate={handleUpdateCard} onDelete={handleDeleteCard} />
        ))}
        <button onClick={handleAddCard} className="bg-gray-200 p-4 rounded-lg text-center text-gray-600 cursor-pointer hover:bg-gray-300">
          + Add new card
        </button>
      </div>
    </div>
  );
};

export default Column;



// import React, { useState, useEffect } from 'react';
// import Card from './Card';
// import { ColumnData, CardData } from '../interfaces';

// interface ColumnProps {
//   column: ColumnData;
//   onUpdateColumn: (columnId: string, newTitle: string) => void;
//   onDeleteColumn: (columnId: string) => void;
// }

// const Column: React.FC<ColumnProps> = ({ column, onUpdateColumn, onDeleteColumn }) => {
//   const [cards, setCards] = useState<CardData[]>(column.cards);
//   const [isEditingTitle, setIsEditingTitle] = useState(false);
//   const [newTitle, setNewTitle] = useState(column.title);
//   const [menuOpen, setMenuOpen] = useState(false);

//   useEffect(() => {
//     const fetchCards = async () => {
//       try {
//         const response = await fetch(`/api/columns/${column.id}`);
//         const fetchedColumn: ColumnData = await response.json();
//         setCards(fetchedColumn.cards);
//       } catch (error) {
//         console.error('Failed to load cards', error);
//       }
//     };

//     fetchCards();
//   }, [column.id]);

//   const handleAddCard = async () => {
//     const newCard: any = {
//       columnId: column.id,
//       title: 'New Card Title',
//       description: 'New card description',
//     };

//     setCards((prevCards) => [...prevCards, newCard]);

//     await fetch('/api/cards', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(newCard),
//     });
//   };

//   const handleUpdateCard = async (cardId: string, newTitle: string, newDescription: string) => {
//     const existingCard = cards.find((card) => card.id === cardId);

//     if (existingCard) {
//       const updatedCard = {
//         ...existingCard,
//         title: newTitle,
//         description: newDescription,
//       };

//       setCards((prevCards) => prevCards.map((card) => (card.id === cardId ? updatedCard : card)));

//       await fetch(`/api/cards/${cardId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(updatedCard),
//       });
//     }
//   };

//   const handleDeleteCard = async (cardId: string) => {
//     setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));

//     await fetch(`/api/cards/${cardId}`, {
//       method: 'DELETE',
//     });
//   };

//   const handleTitleChange = () => {
//     onUpdateColumn(column.id, newTitle);
//     setIsEditingTitle(false);
//   };

//   return (
//     <div className="w-72 flex-shrink-0 bg-gray-100 p-4 rounded-lg shadow-md mr-4">
//       <div className="flex justify-between items-center mb-4">
//         {isEditingTitle ? (
//           <input
//             value={newTitle}
//             onChange={(e) => setNewTitle(e.target.value)}
//             onBlur={handleTitleChange}
//             onKeyDown={(e) => e.key === 'Enter' && handleTitleChange()}
//             className="text-lg font-semibold w-full"
//           />
//         ) : (
//           <h2 className="text-lg font-semibold">{column.title}</h2>
//         )}
//         <button className="text-gray-500" onClick={() => setMenuOpen(!menuOpen)}>
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
//           </svg>
//         </button>
//         {menuOpen && (
//           <div className="absolute bg-white shadow-md rounded-lg p-2">
//             <button
//               className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//               onClick={() => {
//                 setIsEditingTitle(true);
//                 setMenuOpen(false);
//               }}
//             >
//               Update
//             </button>
//             <button
//               className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//               onClick={() => {onDeleteColumn(column.id); setMenuOpen(false)}}
//             >
//               Delete
//             </button>
//           </div>
//         )}
//       </div>
//       <div className="space-y-4">
//         {cards.map((card) => (
//           <Card key={card.id} card={card} onUpdate={handleUpdateCard} onDelete={handleDeleteCard} />
//         ))}
//         <button onClick={handleAddCard} className="bg-gray-200 p-4 rounded-lg text-center text-gray-600 cursor-pointer hover:bg-gray-300">
//           + Add new card
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Column;
