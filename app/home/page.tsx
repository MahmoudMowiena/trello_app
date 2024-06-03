"use client";

import React, { useState, useEffect } from 'react';
import Board from '../../components/Board';
import Navbar from '../../components/Navbar';
import Titlebar from '../../components/Titlebar';
import { ColumnData as Column } from '../../interfaces';
import { supabase } from '@/infrastructure/lib/supabase';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [columns, setColumns] = useState<Column[]>([]);

  useEffect(() => {
    const loadColumns = async () => {
      const data = await fetchData();
      setColumns(data);
      router.refresh();
    };

    loadColumns();
  }, []);

  const router = useRouter();

  async function fetchData() {
    const response = await fetch('/api/columns');
    const columns: Column[] = await response.json();
    return columns;
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) console.log(error);
    else router.refresh();
  }

  return (
    <>
      <Navbar onLogout={signOut} />
      <Titlebar />
      <Board initialColumns={columns} />
    </>
  );
};
