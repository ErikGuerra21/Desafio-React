import React from 'react';

interface Bank {
  bankName: string;
  description: string;
  age: number;
  url: string;
  timestamp?: string;
}

interface BanksTableProps {
  banks: Bank[];
  filteredBanks: Bank[];
  sortColumn: string | null;
  sortOrder: 'asc' | 'desc';
  handleSort: (column: keyof Bank) => void;
  handleDelete: (bankName: string) => void;
  formatTimestamp: (timestamp: string) => string;
}

const BanksTable: React.FC<BanksTableProps> = ({
  banks,
  filteredBanks,
  sortColumn,
  sortOrder,
  handleSort,
  handleDelete,
  formatTimestamp,
}) => {
  return (
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
                  <a href={bank.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
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
  );
};

export default BanksTable;
