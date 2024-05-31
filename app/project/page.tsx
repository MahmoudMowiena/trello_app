
import React from 'react';
import Board from '../../components/Board';
import Navbar from '../../components/Navbar';
import Titlebar from '../../components/Titlebar';
import { ColumnData as Column } from '../../interfaces';

interface ProjectPageProps {
  initialColumns: Column[];
}

async function getData() {
    const response = await fetch('http://localhost:3000/api/columns');
    const columns: Column[] = await response.json();
    return columns;
}

const ProjectPage: React.FC<ProjectPageProps> = async () => {
  const columns = await getData();
  return (
    <>
      <Navbar />
      <Titlebar />
      <Board initialColumns={columns} />
    </>
  );
};

export default ProjectPage;
