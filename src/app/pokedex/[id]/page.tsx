import PokemonClient from "./PokemonClient";

// ESTE ARQUIVO É SERVER COMPONENT
// Ele pega o params, que é uma Promise no Next 16
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // Agora sim! params é resolvido aqui.
  
  return <PokemonClient id={id} />;
}
