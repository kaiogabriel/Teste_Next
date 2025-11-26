import "./globals.css";
import { NavBar } from "@/components/nav_bar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body
        className="antialiased"
      >
       <NavBar />
          {children}
      </body>
    </html>
  );
}
