import "./globals.css";
import { NavBar } from "@/components/nav_bar";

export const metadata = {
  title: "Pokemon",
  description: "Uma Pokédex simples feita em Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="antialiased bg-gray-100">
        <NavBar />
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
