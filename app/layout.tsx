import "@/app/ui/globals.css";
import { clashGrotesk } from "./ui/fonts";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${clashGrotesk.className} antialiased`}>{children}</body>
    </html>
  );
}
