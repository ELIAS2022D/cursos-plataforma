import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-[#f6f7f9] text-[#24292f] font-sans">
        {children}
      </body>
    </html>
  );
}
