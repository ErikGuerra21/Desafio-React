'use server';


interface Bank {
    bankName: string;
    description: string;
    age: number;
    url: string;
    timestamp?: string;
  }

export async function GetBanks() {
  try {const response = await fetch('https://dev.obtenmas.com/catom/api/challenge/banks');
    const data: Bank[] = await response.json();
    const currentTimestamp = new Date().toISOString();

    const banksWithTimestamp = data.map((bank) => ({
      ...bank,
      timestamp: currentTimestamp,
    }));
    return banksWithTimestamp;
  } catch (error) {
    console.error(error);
    return [];
  }
}
