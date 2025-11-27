"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { typeColors } from "@/app/typesColors"; // importar cores

interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
}

export default function PokedexPage() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const limit = 50;

  const loadPokemons = async (page: number) => {
    const start = page * limit + 1;
    const end = start + limit - 1;
    const lista: Pokemon[] = [];

    for (let id = start; id <= end && id <= 1025; id++) {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();
        lista.push({
          id: data.id,
          name: data.name,
          image: data.sprites.front_default,
          types: data.types.map((t: any) => t.type.name),
        });
      } catch (err) {
        console.error("Erro ao carregar Pokémon", id, err);
      }
    }

    return lista;
  };

  useEffect(() => {
    async function init() {
      setLoading(true);
      const initial = await loadPokemons(0);
      setPokemons(initial);
      setLoading(false);
    }
    init();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 500
      ) {
        setPage((prev) => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (page === 0) return;
    const loadMore = async () => {
      const more = await loadPokemons(page);
      setPokemons((prev) => [...prev, ...more]);
    };
    loadMore();
  }, [page]);

  const filteredPokemons = pokemons.filter((p) => {
    const matchesName = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType ? p.types.includes(filterType) : true;
    return matchesName && matchesType;
  });

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold text-center mb-6">Pokédex Completa</h1>

      {/* Buscador e filtro */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Buscar por nome..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded-md w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-2 border rounded-md w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Todos os tipos</option>
          {Object.keys(typeColors).map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Lista de Pokémon */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {filteredPokemons.map((p) => (
          <Link
            key={p.id}
            href={`/pokedex/${p.id}`}
            className="group text-center block p-4 rounded-lg shadow-md transform transition hover:scale-105 hover:shadow-xl"
            style={{
              backgroundColor:
                p.types.length > 0 ? undefined : "white",
            }}
          >
            <div
              className={`rounded-lg p-2 ${
                p.types.length > 0 ? typeColors[p.types[0]] : "bg-white"
              }`}
            >
              <Image
                src={p.image}
                width={100}
                height={100}
                alt={p.name}
                className="mx-auto"
                loading="lazy"
              />
            </div>
            <p className="mt-2 font-semibold capitalize">{p.name}</p>
            <p className="text-gray-500">#{p.id}</p>
            <div className="flex justify-center gap-1 mt-1 flex-wrap">
              {p.types.map((t) => (
                <span
                  key={t}
                  className={`text-xs px-2 py-1 rounded-md text-white capitalize ${
                    typeColors[t] || "bg-gray-300"
                  }`}
                >
                  {t}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>

      {loading && <p className="text-center mt-6">Carregando Pokémon...</p>}
    </div>
  );
}
