let columns = [{
  "id": "1",
  "title": "Design"
},
{
  "id": "2",
  "title": "Prototype"
}]

export const getAllColumns = async () => {
  return columns;
};

export const getColumnById = async (id: string) => {
  return columns.find((column: any) => column.id === id);
};

export const addColumn = async (newColumn: any) => {
  columns.push(newColumn);
  return newColumn;
};

export const updateColumn = async (id: string, updatedColumn: any) => {
  const columnIndex = columns.findIndex((column: any) => column.id === id);
  if (columnIndex !== -1) {
    columns[columnIndex] = { ...columns[columnIndex], ...updatedColumn };
    return columns[columnIndex];
  }
  return null;
};

export const deleteColumn = async (id: string) => {
  const newColumns = columns.filter((column: any) => column.id !== id);
  columns = newColumns;
  return newColumns;
};