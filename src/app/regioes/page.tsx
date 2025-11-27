"use client";

import Link from "next/link";

const regioes = [
  { nome: "Kanto", inicio: 1, fim: 151 },
  { nome: "Johto", inicio: 152, fim: 251 },
  { nome: "Hoenn", inicio: 252, fim: 386 },
  { nome: "Sinnoh", inicio: 387, fim: 493 },
  { nome: "Unova", inicio: 494, fim: 649 },
  { nome: "Kalos", inicio: 650, fim: 721 },
  { nome: "Alola", inicio: 722, fim: 809 },
  { nome: "Galar", inicio: 810, fim: 898 },
  { nome: "Paldea", inicio: 906, fim: 1025 },
];

export default function RegioesPage() {
  return (
    <div className="max-w-3xl mx-auto py-10 text-center">
      <h1 className="text-4xl font-bold mb-6">Selecione uma Região</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {regioes.map((r) => (
          <Link
            key={r.nome}
            href={`/regioes/${r.nome.toLowerCase()}`}
            className="p-4 rounded-lg shadow-md bg-white hover:bg-red-100 transition border border-gray-200"
          >
            <h2 className="text-2xl font-semibold text-red-600">{r.nome}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
