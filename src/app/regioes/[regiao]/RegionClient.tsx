"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const regioesInfo: any = {
  kanto: { inicio: 1, fim: 151 },
  johto: { inicio: 152, fim: 251 },
  hoenn: { inicio: 252, fim: 386 },
  sinnoh: { inicio: 387, fim: 493 },
  unova: { inicio: 494, fim: 649 },
  kalos: { inicio: 650, fim: 721 },
  alola: { inicio: 722, fim: 809 },
  galar: { inicio: 810, fim: 898 },
  paldea: { inicio: 906, fim: 1025 },
};

export default function RegionClient({ regiao }: { regiao: string }) {
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const info = regioesInfo[regiao.toLowerCase()];

  useEffect(() => {
    async function loadRegion() {
      if (!info) return;

      const { inicio, fim } = info;
      const lista: any[] = [];

      // Cria array de IDs
      const ids = Array.from({ length: fim - inicio + 1 }, (_, i) => i + inicio);

      try {
        // Requisições em paralelo
        const results = await Promise.all(
          ids.map(async (id) => {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const data = await res.json();
            return {
              id: data.id,
              name: data.name,
              image: data.sprites.front_default,
            };
          })
        );

        setPokemons(results);
      } catch (error) {
        console.error("Erro ao carregar Pokémon:", error);
      } finally {
        setLoading(false);
      }
    }

    loadRegion();
  }, [regiao]);

  if (!info) return <p className="text-center mt-10 text-xl">Região não encontrada.</p>;
  if (loading) return <p className="text-center mt-10 text-xl">Carregando Pokémons...</p>;

  return (
    <div className="max-w-5xl mx-auto py-10">
      <h1 className="text-4xl font-bold text-center mb-6">
        Pokédex de {regiao.charAt(0).toUpperCase() + regiao.slice(1)}
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {pokemons.map((p) => (
          <Link
            key={p.id}
            href={`/pokedex/${p.id}`}
            className="text-center block p-4 bg-white shadow-md rounded-lg hover:bg-red-100 transition"
          >
            <Image
              src={p.image}
              width={120}
              height={120}
              alt={p.name}
              className="mx-auto"
            />
            <p className="mt-2 font-semibold capitalize">{p.name}</p>
            <p className="text-gray-500">#{p.id}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
