"use client"; // Agora é realmente Client Component

import { useEffect, useState } from "react";
import Image from "next/image";

export default function PokemonClient({ id }: { id: string }) {
  const [pokemon, setPokemon] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fetch feito no navegador → sem SSR → sem bug
  useEffect(() => {
    async function loadPokemon() {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();
        setPokemon(data);
      } catch (error) {
        console.error("Erro ao carregar Pokémon:", error);
      } finally {
        setLoading(false);
      }
    }

    loadPokemon();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Carregando...</p>;

  if (!pokemon) return <p>Pokémon não encontrado.</p>;

  return (
    <div className="max-w-xl mx-auto text-center">
      <h1 className="text-4xl font-bold capitalize text-red-500 mb-4">
        {pokemon.name}
      </h1>

      <Image
        src={pokemon.sprites.front_default}
        width={200}
        height={200}
        alt={pokemon.name}
        className="mx-auto"
      />

      <h2 className="text-2xl font-semibold mt-6">Tipo(s):</h2>
      <div className="flex justify-center gap-3 mt-2">
        {pokemon.types.map((t: any) => (
          <span
            key={t.type.name}
            className="bg-red-100 text-red-600 px-3 py-1 rounded-full capitalize"
          >
            {t.type.name}
          </span>
        ))}
      </div>

      <h2 className="text-2xl font-semibold mt-6">Altura:</h2>
      <p>{pokemon.height / 10} m</p>

      <h2 className="text-2xl font-semibold mt-6">Peso:</h2>
      <p>{pokemon.weight / 10} kg</p>
    </div>
  );
}
