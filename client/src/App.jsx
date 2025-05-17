import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import NotFound from "./pages/NotFound";
import UserRoutes from "./pages/user/User";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Events from "./pages/Events";
import Congratulations from "./components/Events/Congratulations";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { ThemeProvider } from "@emotion/react";
import { themeSettings } from "./theme";
import { createTheme, CssBaseline } from "@mui/material";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <Routes>
            {/* Pages with Layout (Header + Footer) */}
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/events" element={<Events />} />
              <Route path="/congratulations" element={<Congratulations />} />
              <Route path="/user/id" element={<UserRoutes />} />
              <Route path="/admin" element={<Admin />} />
            </Route>

            {/* Pages without Layout */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
