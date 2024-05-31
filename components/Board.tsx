"use client";

import React, { useState, useEffect } from 'react';
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


  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <div className="flex overflow-x-auto px-4 py-4">
          {columns.map(column => (
            <Column
              key={column.id}
              column={column}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Board;


// "use client";

// import React, { useState, useEffect, useCallback } from 'react';
// import Column from './Column';
// import { ColumnData } from '../interfaces';

// interface BoardProps {
//   initialColumns: ColumnData[];
// }

// const Board: React.FC<BoardProps> = ({ initialColumns }) => {
//   const [columns, setColumns] = useState<ColumnData[]>(initialColumns);

//   const fetchColumns = async () => {
//     try {
//       const response = await fetch('/api/columns');
//       const data: ColumnData[] = await response.json();
//       setColumns(data);
//     } catch (error) {
//       console.error('Failed to load columns', error);
//     }
//   };

//   useEffect(() => {
//     fetchColumns();
//   }, []);

//   const handleAddColumn = async () => {
//     const newColumn = {
//       id: `column-${Date.now()}`,
//       title: 'New Column',
//       cards: [],
//     };

//     setColumns((prevColumns) => [...prevColumns, newColumn]);

//     await fetch('/api/columns', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(newColumn),
//     });
//   };

//   const handleDeleteColumn = async (columnId: string) => {
//     setColumns((prevColumns) => prevColumns.filter((column) => column.id !== columnId));

//     await fetch(`/api/columns/${columnId}`, {
//       method: 'DELETE',
//     });
//   };

//   const handleUpdateColumn = async (columnId: string, newTitle: string) => {
//     const updatedColumns = columns.map((column) =>
//       column.id === columnId ? { ...column, title: newTitle } : column
//     );
//     setColumns(updatedColumns);

//     await fetch(`/api/columns/${columnId}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ title: newTitle }),
//     });
//   };

//   return (
//     <section className="bg-blue-50 px-4 py-10">
//       <div className="container-xl lg:container m-auto">
//         <div className="flex overflow-x-auto px-4 py-4">
//           {columns.map((column) => (
//             <Column
//               key={column.id}
//               column={column}
//               onUpdateColumn={handleUpdateColumn}
//               onDeleteColumn={handleDeleteColumn}
//             />
//           ))}
//           <div
//             onClick={handleAddColumn}
//             className="w-72 flex-shrink-0 bg-white p-4 rounded-lg shadow-md mr-4 text-center cursor-pointer"
//           >
//             + Add new column
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Board;
