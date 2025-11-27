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
    <div>
      <h1 className="bg-red-100">Seja bem-vindo ao Game On!</h1>
    </div>
  );
}