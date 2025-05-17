import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const Congratulations = () => {
  const theme = useTheme();
  const darkMode = theme.palette.mode === "dark";

  return (
    <div
      className="text-center p-10 bg-white min-h-screen flex flex-col justify-center items-center"
      style={{
        backgroundColor: darkMode ? theme.palette.background.default : undefined,
      }}
    >
      <h1
        className="text-4xl font-bold mb-4"
        style={{
          color: darkMode ? "#22c55e" : undefined, // green-600
        }}
      >
        🎉 Congratulations!
      </h1>
      <p
        className="text-lg mb-6"
        style={{
          color: darkMode ? theme.palette.text.secondary : "#4b5563", // gray-700 / gray-300 for light/dark
        }}
      >
        You have successfully booked your ticket.
      </p>
      <Link to="/events">
        <button
          className="px-6 py-2 rounded-xl font-semibold hover:bg-indigo-700 transition text-white"
          style={{
            backgroundColor: darkMode ? theme.palette.primary.main : undefined,
          }}
        >
          Back to Events
        </button>
      </Link>
    </div>
  );
};

export default Congratulations;
