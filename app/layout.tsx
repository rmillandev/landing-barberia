import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NAVA Barber Studio | Tu estilo. Tu sello.",
  description: "Demo de barbería: explora servicios y estilos, descubre la galería y prepara tu reserva por WhatsApp.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}
