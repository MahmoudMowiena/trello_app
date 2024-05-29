import React from 'react'
import Board from '../../components/Board';
import '../globals.css';
import Navbar from '@/components/Navbar';
import Titlebar from '@/components/Titlebar';

export default function Project() {
  return (
    <>
        <Navbar />
        <Titlebar />
        <Board />
    </>
  );
};
