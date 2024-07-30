import type { Metadata } from "next";
import { Roboto, Rubik_Scribble } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["italic", "normal"],
  variable: "--roboto-text",
});

const rubikScribble = Rubik_Scribble({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
  variable: "--rubik-text",
});

const metallica = localFont({
  src: "./metallica.ttf",
  variable: "--metallica-text",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Karrot Market",
    default: "Karrot Market",
  },
  description: "Sell and buy all the things",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${rubikScribble.variable} ${metallica.variable} bg-neutral-900 text-white`}
      >
        {children}
      </body>
    </html>
  );
}
