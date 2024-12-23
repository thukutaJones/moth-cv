import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";
import React from "react";

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="min-h-screen flex flex-col">
      <header>
        <TopBar />
      </header>
      <div className="flex-grow">{children}</div>
      <footer>
        <Footer />
      </footer>
    </main>
  );
};

export default RootLayout;
