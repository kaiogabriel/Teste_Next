import Image from "next/image";
import { rootCertificates } from "tls";
export const metadata = {
  title: "Game-On",
  description: "Plataforma de Campeonatos/Torneios de E-games (Jogos virtuais) e jogos presenciais.",
  openGraph: {
    title: "Game-On",
    description: "Plataforma de Campeonatos/Torneios de E-games (Jogos virtuais) e jogos presenciais.",
    images: "/img/arduino.png",
  },
  robots: {
    index : true,
    follow : true, 
  }
}
export default function HomePage() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-red-500">
        Bem-vindo à Pokédex!
      </h1>

      <p className="mt-4 text-gray-600">
        Explore informações dos Pokémons usando Next.js + PokéAPI.
      </p>
    </div>
  );
}