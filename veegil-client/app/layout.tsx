import MobileNav from "@/components/navbar/MobileHeader";
import Header from "@/components/navbar/Header";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FindProsper",
  description: "Veegil media assessment for Banking App features",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <MobileNav />
        <main> {children}</main>
        <Footer />
      </body>
    </html>
  );
}
