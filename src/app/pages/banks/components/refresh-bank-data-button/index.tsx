// RefreshBankDataButton.tsx
import React from 'react';

interface RefreshBankDataButtonProps {
  onReset: () => void; // Función que se ejecuta al hacer clic en el botón
  isModified: boolean; // Estado que indica si se hicieron cambios en los datos
}

const RefreshBankDataButton: React.FC<RefreshBankDataButtonProps> = ({ onReset, isModified }) => {
  if (!isModified) return null; // No muestra el botón si no hubo modificaciones

  return (
    <div className="text-center mt-6">
      <button
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 transition ease-in-out duration-150"
        onClick={onReset}
      >
        Recargar Datos
      </button>
    </div>
  );
};

export default RefreshBankDataButton;
