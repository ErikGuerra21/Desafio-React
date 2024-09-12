// app/page.tsx
import BanksPage from "./pages/banks";
import { GetBanks } from "./pages/banks/application/GetBanks";


export default async function Home() {
 const banks = await GetBanks();
  return (
    <main>
     <BanksPage banksList={banks}/>
    </main>
  );
}
