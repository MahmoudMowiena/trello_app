"use client";
import React, { useState, useEffect } from 'react';
import Column from './Column';
import { ColumnData } from '../interfaces'
import { getAllColumns } from '../repositories/columnRepo'

const Board: React.FC = () => {
  const [columns, setColumns] = useState<ColumnData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchColumns = async () => {
      const fetchedColumns = await getAllColumns();
      setColumns(fetchedColumns);
      setLoading(false);
    };

    fetchColumns();
  }, []);

return (
  <section className="bg-blue-50 px-4 py-10">
    <div className="container-xl lg:container m-auto">
        <div className="flex overflow-x-auto px-4 py-4">
          {columns.map((column) => (
            <Column key={column.id} column={column} />
          ))}
        </div>
    </div>
  </section>
);
};

export default Board;