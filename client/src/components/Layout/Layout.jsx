// src/components/Layout/Layout.jsx
import Footer from "./Footer";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { useTheme } from "@emotion/react";

const Layout = () => {
  const theme = useTheme();

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: theme.palette.background.default }}
    >
      <Header />
      <main className="flex-grow transition-colors duration-300">
        <div
          className="container mx-auto px-4 py-6"
          style={{ color: theme.palette.text.primary }}
        >
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
