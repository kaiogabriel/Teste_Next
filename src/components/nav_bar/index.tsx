import Link from "next/link";
export function NavBar() {
  return (
    <nav className="bg-white shadow-md w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          MinhaLogo
        </Link>

        {/* Menu Desktop */}
        <ul className="hidden md:flex gap-8 text-gray-700 font-medium">
          <li>
            <Link href="/" className="hover:text-blue-600 transition">Home</Link>
          </li>
          <li>
            <Link href="/sobre" className="hover:text-blue-600 transition">Sobre</Link>
          </li>
          <li>
            <Link href="/contato" className="hover:text-blue-600 transition">Contato</Link>
          </li>
        </ul>

      </div>
    </nav>
  );
}