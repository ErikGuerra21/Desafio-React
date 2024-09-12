// BanksPage.tsx
'use client';

import React, { useState, useEffect } from 'react';
import BanksTable from '../banks/components/banks-table'; // Asegúrate de ajustar la ruta si es necesario
import RefreshBankDataButton from '../banks/components/refresh-bank-data-button'; // Importar el componente de recarga de datos
import SearchBar from '../banks/components/search-bar'; // Importar el nuevo componente de búsqueda



interface Bank {
    bankName: string;
    description: string;
    age: number;
    url: string;
    timestamp?: string;
  }

 interface BanksPageProps {
    banksList:Bank[]
 } 

const BanksPage = (props:BanksPageProps) => {
  const [banks, setBanks] = useState<Bank[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [isModified, setIsModified] = useState(false);

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  const loadBanks = async () => {
    const storedBanks = localStorage.getItem('banksData');
    const storedOriginalBanks = localStorage.getItem('originalBanksData');

    if (storedBanks) {
      setBanks(JSON.parse(storedBanks));
    } else {

      const banksWithTimestamp = props.banksList;

      localStorage.setItem('banksData', JSON.stringify(banksWithTimestamp));
      if (!storedOriginalBanks) {
        localStorage.setItem('originalBanksData', JSON.stringify(banksWithTimestamp));
      }
      setBanks(banksWithTimestamp);
    }
  };

  useEffect(() => {
    loadBanks();
  }, []);

  const handleDelete = (bankName: string) => {
    const updatedBanks = banks.filter((bank) => bank.bankName !== bankName);
    setBanks(updatedBanks);
    localStorage.setItem('banksData', JSON.stringify(updatedBanks));
    setIsModified(true);
  };

  const handleReset = () => {
    const originalBanks = localStorage.getItem('originalBanksData');
    if (originalBanks) {
      const updatedBanks = JSON.parse(originalBanks);
      const currentTimestamp = new Date().toISOString();
      const banksWithUpdatedTimestamp = updatedBanks.map((bank:Bank) => ({
        ...bank,
        timestamp: currentTimestamp,
      }));
      setBanks(banksWithUpdatedTimestamp);
      localStorage.setItem('banksData', JSON.stringify(banksWithUpdatedTimestamp));
    }
    setIsModified(false);
  };

  const filteredBanks = banks.filter((bank) =>
    bank.bankName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSort = (column: keyof Bank) => {
    const newSortOrder = sortColumn === column && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortColumn(column);
    setSortOrder(newSortOrder);
    const sortedBanks = [...filteredBanks].sort((a:any, b: any) => {
      if (a[column] < b[column]) return newSortOrder === 'asc' ? -1 : 1;
      if (a[column] > b[column]) return newSortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    setBanks(sortedBanks);
  };

  return (
    <>
      <h2 className="text-3xl font-semibold mb-6 text-center text-white">Lista de Bancos de la prueba</h2>

      <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <BanksTable
        banks={banks}
        filteredBanks={filteredBanks}
        sortColumn={sortColumn}
        sortOrder={sortOrder}
        handleSort={handleSort}
        handleDelete={handleDelete}
        formatTimestamp={formatTimestamp}
      />

      <RefreshBankDataButton onReset={handleReset} isModified={isModified} />
    </>
  );
};

export default BanksPage;
