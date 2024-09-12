// RefreshBankDataButton.tsx
import React from 'react';

// Define la interfaz para las propiedades que acepta el componente RefreshBankDataButton.
interface RefreshBankDataButtonProps {
  onReset: () => void; // Función que se ejecuta al hacer clic en el botón para reiniciar o recargar los datos.
  isModified: boolean; // Estado que indica si se han realizado cambios en los datos.
}

// Componente que muestra un botón para recargar los datos solo si los datos han sido modificados.
const RefreshBankDataButton: React.FC<RefreshBankDataButtonProps> = ({ onReset, isModified }) => {
  // Si los datos no han sido modificados, no se muestra el botón.
  if (!isModified) return null;

  return (
    <div className="text-center mt-6">
      <button
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 transition ease-in-out duration-150"
        onClick={onReset} // Asocia la función onReset al evento onClick del botón.
      >
        Recargar Datos
      </button>
    </div>
  );
};

export default RefreshBankDataButton;
