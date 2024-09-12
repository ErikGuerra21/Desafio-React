'use server'; // Indica que este archivo está configurado para ejecutarse en el servidor.

// Define la interfaz Bank que describe la estructura de un objeto banco.
interface Bank {
  bankName: string;      // Nombre del banco
  description: string;   // Descripción del banco
  age: number;           // Edad o tiempo de existencia del banco
  url: string;           // URL del sitio web del banco
  timestamp?: string;    // Marca de tiempo opcional para registrar cuándo se obtuvo la información
}

// Función asíncrona que obtiene la lista de bancos desde una API externa.
export async function GetBanks() {
  try {
    // Realiza una solicitud fetch a la API para obtener los datos de los bancos.
    const response = await fetch('https://dev.obtenmas.com/catom/api/challenge/banks');
    const data: Bank[] = await response.json(); // Convierte la respuesta en un array de objetos tipo Bank.

    // Genera una marca de tiempo actual en formato ISO.
    const currentTimestamp = new Date().toISOString();

    // Mapea los datos para agregar la marca de tiempo a cada banco.
    const banksWithTimestamp = data.map((bank) => ({
      ...bank,                 // Copia todas las propiedades existentes del objeto bank.
      timestamp: currentTimestamp, // Añade la marca de tiempo a cada objeto de banco.
    }));

    return banksWithTimestamp; // Devuelve el array de bancos con la marca de tiempo añadida.
  } catch (error) {
    console.error(error); // Imprime cualquier error que ocurra durante la solicitud.
    return [];            // Devuelve un array vacío si hay un error.
  }
}
