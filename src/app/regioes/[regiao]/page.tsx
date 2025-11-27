import RegionClient from "./RegionClient";

export default async function Page({ params }: { params: Promise<{ regiao: string }> }) {
  const { regiao } = await params;

  return <RegionClient regiao={regiao} />;
}
