import { getSongs } from "../lib/sheets";
import SongTable from "../components/songTable";

export default async function Home() {
  const songs = await getSongs();

  return (
    <main className="bg-white flex flex-col items-center justify-between">
      <SongTable songs={songs} />
    </main>
  );
}
