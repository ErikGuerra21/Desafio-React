// SearchBar.tsx
import React from 'react';

// Define la interfaz para las propiedades que acepta el componente SearchBar.
interface SearchBarProps {
  searchQuery: string;                // El valor actual de la consulta de búsqueda.
  onSearchChange: (query: string) => void;  // Función que se llama cuando cambia el texto de búsqueda.
}

// Componente que muestra una barra de búsqueda para filtrar los bancos por nombre.
const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="relative mb-6">
      <input
        type="text"
        placeholder="Buscar por nombre de banco..." // Texto de sugerencia que aparece cuando el campo está vacío.
        className="w-full p-4 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={searchQuery}  // Valor del campo de entrada basado en la consulta de búsqueda actual.
        onChange={(e) => onSearchChange(e.target.value)}  // Llama a onSearchChange con el nuevo valor cuando cambia el texto.
      />
    </div>
  );
};

export default SearchBar;
