import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { SplineProvider } from "@/context/SplineContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Loader from "@/components/ui/Loader";

export const metadata = {
  title: "Quranium | Web3 Native Platform",
  description: "A fresh, innovative, web3 native approach to Quranium",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <SplineProvider>
            <Loader />
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
          </SplineProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
