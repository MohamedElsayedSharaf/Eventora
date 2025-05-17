import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Button from "../Ui/Button";
import { toggleMode } from "../../state";
import { useDispatch } from "react-redux";
import { useTheme } from "@emotion/react";
import { IconButton } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const Header = () => {
  const { user, logout, loading } = useAuth();
  const dispatch = useDispatch();
  const theme = useTheme();

  return (
    <header
      style={{ backgroundColor: theme.palette.background.alt }}
      className="shadow-md transition-colors duration-200"
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo/Brand */}
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center group">
            <svg
              className="w-8 h-8 text-primary-500 group-hover:text-primary-600 transition-colors"
              style={{ color: theme.palette.secondary.main }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <span
              style={{ color: theme.palette.secondary[300] }}
              className="ml-2 text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors"
            >
              Eventora
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav
          className="hidden md:flex space-x-6"
          style={{ color: theme.palette.secondary.main }}
        >
          {[
            { to: "/", label: "Home" },
            { to: "/events", label: "Events" },
            { to: "/about", label: "About Us" },
            { to: "/contact", label: "Contact" },
            user && { to: "/profile", label: "My Bookings" },
            user?.role === "admin" && { to: "/admin", label: "Admin" },
          ]
            .filter(Boolean)
            .map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-lg font-bold transition-colors ${
                    isActive ? "text-amber-400" : theme.palette.text.primary
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
        </nav>

        {/* Right side - Auth and dark mode toggle */}
        <div className="flex items-center space-x-4">
          <IconButton onClick={() => dispatch(toggleMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkModeIcon sx={{ fontSize: 27 }} />
            ) : (
              <LightModeIcon sx={{ fontSize: 27 }} />
            )}
          </IconButton>

          {!loading && (
            <div className="flex space-x-3 items-center">
              {user ? (
                <>
                  <span
                    
                    className="hidden sm:inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors"
                  >
                    {user.username}
                  </span>
                  <Button
                    variant="outline"
                    onClick={logout}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="outline" className="text-amber-300">Login</Button>
                  </Link>
                  
                  <Link to="/register">
                    <Button>Register</Button>
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
