import React from 'react';

// Define la interfaz para las propiedades que acepta el componente BanksTable.
interface Bank {
  bankName: string;      // Nombre del banco
  description: string;   // Descripción del banco
  age: number;           // Años de servicio del banco
  url: string;           // URL del banco
  timestamp?: string;    // Marca de tiempo opcional para el banco
}

// Define la interfaz para las propiedades que recibe el componente BanksTable.
interface BanksTableProps {
  banks: Bank[];                     // Lista completa de bancos
  filteredBanks: Bank[];             // Lista de bancos filtrados
  sortColumn: string | null;         // Columna actual por la cual se ordena
  sortOrder: 'asc' | 'desc';         // Orden de clasificación: ascendente o descendente
  handleSort: (column: keyof Bank) => void;   // Función para manejar la clasificación de columnas
  handleDelete: (bankName: string) => void;  // Función para manejar la eliminación de un banco
  formatTimestamp: (timestamp: string) => string;  // Función para formatear la marca de tiempo
}

// Componente BanksTable que muestra una tabla de bancos con opciones para ordenar y eliminar.
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
            {/* Encabezado para la columna del nombre del banco */}
            <th
              className="py-3 px-6 text-xs font-medium uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('bankName')}
            >
              Nombre del Banco {sortColumn === 'bankName' && (sortOrder === 'asc' ? '🔼' : '🔽')}
            </th>
            {/* Encabezado para la columna de descripción */}
            <th
              className="py-3 px-6 text-xs font-medium uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('description')}
            >
              Descripción {sortColumn === 'description' && (sortOrder === 'asc' ? '🔼' : '🔽')}
            </th>
            {/* Encabezado para la columna de años de servicio */}
            <th
              className="py-3 px-6 text-xs font-medium uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('age')}
            >
              Años de Servicio {sortColumn === 'age' && (sortOrder === 'asc' ? '🔼' : '🔽')}
            </th>
            {/* Encabezado para la columna de URL */}
            <th className="py-3 px-6 text-xs font-medium uppercase tracking-wider">URL</th>
            {/* Encabezado para la columna de marca de tiempo */}
            <th className="py-3 px-6 text-xs font-medium uppercase tracking-wider">Marca de Tiempo</th>
            {/* Encabezado para la columna de acciones */}
            <th className="py-3 px-6 text-xs font-medium uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-gray-900 divide-y divide-gray-700">
          {filteredBanks.length > 0 ? (
            filteredBanks.map((bank, index) => (
              <tr key={index} className="hover:bg-gray-700 transition duration-150 ease-in-out">
                {/* Fila con información del nombre del banco */}
                <td className="py-4 px-6 text-sm font-medium">{bank.bankName}</td>
                {/* Fila con descripción del banco */}
                <td className="py-4 px-6 text-sm text-gray-400">{bank.description}</td>
                {/* Fila con años de servicio del banco */}
                <td className="py-4 px-6 text-sm text-gray-400">{bank.age}</td>
                {/* Fila con URL del banco */}
                <td className="py-4 px-6 text-sm text-blue-400">
                  <a href={bank.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {bank.url}
                  </a>
                </td>
                {/* Fila con marca de tiempo formateada */}
                <td className="py-4 px-6 text-sm text-gray-400">
                  {bank.timestamp ? formatTimestamp(bank.timestamp) : 'N/A'}
                </td>
                {/* Fila con botón para eliminar el banco */}
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
