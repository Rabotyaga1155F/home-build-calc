import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "./globals.css";
import Header from "@/components/ui/header/Header";
import Footer from "@/components/ui/footer/Footer";
import { DEFAULT_BACKGROUND_COLOR } from "@/constants/colors";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Калькулятор строительства",
  description: "Подробный калькулятор строительства загородного дома",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${onest.className}`}>
        <Header />
        <div
          style={{ backgroundColor: DEFAULT_BACKGROUND_COLOR }}
          className={"md:px-44 px-6"}
        >
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
