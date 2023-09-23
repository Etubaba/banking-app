import MobileNav from "@/components/navbar/MobileHeader";
import Header from "@/components/navbar/Header";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ZeeWallet",
  description: "Zeewallet is an online Banking App",
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
