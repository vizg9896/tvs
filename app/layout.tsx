import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { DataProvider } from "../components/DataContext";
import WhatsAppButton from "../components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Shree Balaji TVS | Premier TVS Showroom Chhuchhakwas",
  description: "Explore, customize, and book from our premium lineup of TVS motorcycles and electric vehicles including Apache, Ronin, Raider, and iQube EV at Shree Balaji TVS Chhuchhakwas.",
  keywords: "TVS Showroom, Shree Balaji TVS, Chhuchhakwas, Jhajjar, Apache RTR 310, Ronin, Raider 125, iQube EV, TVS Booking, Haryana",
  authors: [{ name: "Shree Balaji TVS" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="light-theme">
        <DataProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
        </DataProvider>
      </body>
    </html>
  );
}
