'use client'; // Necesario para manejar el estado del cliente

import React, { useState, useEffect } from 'react';

interface Bank {
  bankName: string;
  description: string;
  age: number;
  url: string;
  timestamp?: string; // Opcional para la marca de tiempo
}

const BanksTable = () => {
  const [banks, setBanks] = useState<Bank[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); // Orden de clasificación
  const [isModified, setIsModified] = useState(false); // Para manejar si hubo eliminaciones

  // Formato de la marca de tiempo
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  // Cargar datos desde localStorage o la API
  const loadBanks = async () => {
    const storedBanks = localStorage.getItem('banksData');
    const storedOriginalBanks = localStorage.getItem('originalBanksData'); // Datos originales

    if (storedBanks) {
      setBanks(JSON.parse(storedBanks));
    } else {
      const response = await fetch('https://dev.obtenmas.com/catom/api/challenge/banks');
      const data: Bank[] = await response.json();

      // Guardar la fecha y hora actual
      const currentTimestamp = new Date().toISOString(); // ISO 8601 para mantener la precisión

      // Añadir la marca de tiempo a cada banco
      const banksWithTimestamp = data.map(bank => ({
        ...bank,
        timestamp: currentTimestamp
      }));

      // Guardar los datos y la fecha en localStorage
      localStorage.setItem('banksData', JSON.stringify(banksWithTimestamp));
      if (!storedOriginalBanks) {
        localStorage.setItem('originalBanksData', JSON.stringify(banksWithTimestamp)); // Solo se guarda una vez
      }
      setBanks(banksWithTimestamp);
    }
  };

  useEffect(() => {
    loadBanks();
  }, []);

  // Función para eliminar un banco
  const handleDelete = (bankName: string) => {
    const updatedBanks = banks.filter(bank => bank.bankName !== bankName);
    setBanks(updatedBanks);
    localStorage.setItem('banksData', JSON.stringify(updatedBanks));
    setIsModified(true); // Se activará el botón de recargar
  };

  // Función para recargar los datos originales desde localStorage
  const handleReset = () => {
    const originalBanks = localStorage.getItem('originalBanksData');
    if (originalBanks) {
      const updatedBanks = JSON.parse(originalBanks);
      // Actualizar la marca de tiempo cuando se recargan los datos
      const currentTimestamp = new Date().toISOString();
      const banksWithUpdatedTimestamp = updatedBanks.map(bank => ({
        ...bank,
        timestamp: currentTimestamp
      }));
      setBanks(banksWithUpdatedTimestamp);
      localStorage.setItem('banksData', JSON.stringify(banksWithUpdatedTimestamp)); // Actualizamos los datos actuales con los originales
    }
    setIsModified(false); // Ocultar botón de recargar
  };

  // Filtrar bancos según la búsqueda
  const filteredBanks = banks.filter(bank =>
    bank.bankName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Función para ordenar los datos
  const handleSort = (column: keyof Bank) => {
    const newSortOrder = sortColumn === column && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortColumn(column);
    setSortOrder(newSortOrder);

    const sortedBanks = [...filteredBanks].sort((a, b) => {
      if (a[column] < b[column]) return newSortOrder === 'asc' ? -1 : 1;
      if (a[column] > b[column]) return newSortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    setBanks(sortedBanks);
  };

  return (
    <>
      <h2 className="text-3xl font-semibold mb-6 text-center text-white">Lista de Bancos</h2>

      {/* Campo de búsqueda con tema oscuro */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Buscar por nombre de banco..."
          className="w-full p-4 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Tabla con tema oscuro */}
      <div className="overflow-hidden shadow-md rounded-lg">
        <table className="min-w-full bg-gray-800 text-white">
          <thead>
            <tr className="bg-gray-700 text-left">
              <th
                className="py-3 px-6 text-xs font-medium uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('bankName')}
              >
                Nombre del Banco {sortColumn === 'bankName' && (sortOrder === 'asc' ? '🔼' : '🔽')}
              </th>
              <th
                className="py-3 px-6 text-xs font-medium uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('description')}
              >
                Descripción {sortColumn === 'description' && (sortOrder === 'asc' ? '🔼' : '🔽')}
              </th>
              <th
                className="py-3 px-6 text-xs font-medium uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('age')}
              >
                Años de Servicio {sortColumn === 'age' && (sortOrder === 'asc' ? '🔼' : '🔽')}
              </th>
              <th className="py-3 px-6 text-xs font-medium uppercase tracking-wider">URL</th>
              <th className="py-3 px-6 text-xs font-medium uppercase tracking-wider">Marca de Tiempo</th>
              <th className="py-3 px-6 text-xs font-medium uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-gray-900 divide-y divide-gray-700">
            {filteredBanks.length > 0 ? (
              filteredBanks.map((bank, index) => (
                <tr key={index} className="hover:bg-gray-700 transition duration-150 ease-in-out">
                  <td className="py-4 px-6 text-sm font-medium">{bank.bankName}</td>
                  <td className="py-4 px-6 text-sm text-gray-400">{bank.description}</td>
                  <td className="py-4 px-6 text-sm text-gray-400">{bank.age}</td>
                  <td className="py-4 px-6 text-sm text-blue-400">
                    <a
                      href={bank.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {bank.url}
                    </a>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-400">
                    {bank.timestamp ? formatTimestamp(bank.timestamp) : 'N/A'}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:ring-2 focus:ring-red-400"
                      onClick={() => handleDelete(bank.bankName)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-400">
                  No se encontraron resultados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Botón para recargar datos */}
      {isModified && (
        <div className="text-center mt-6">
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 transition ease-in-out duration-150"
            onClick={handleReset}
          >
            Recargar Datos
          </button>
        </div>
      )}
    </>
  );
};

export default BanksTable;
