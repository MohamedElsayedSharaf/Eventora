import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import img1 from "../assets/testimonial-1.jpg";
import img2 from "../assets/testimonial-2.jpg";
import img3 from "../assets/testimonial-3.jpg";

const teamMembers = [
  {
    name: "Mohamed Sharaf",
    role: "Full-Stack Developer",
    img: img1,
    linkedin: "https://www.linkedin.com/in/yourprofile",
  },
  {
    name: "Sara Ahmed",
    role: "UI/UX Designer",
    img: img2,
    linkedin: "#",
  },
  {
    name: "Youssef Ali",
    role: "Backend Engineer",
    img: img3,
    linkedin: "#",
  },
];

const AboutUs = () => {
  const theme = useTheme();
  const darkMode = theme.palette.mode === "dark";

  return (
    <div
      className="bg-white min-h-screen"
      style={{
        backgroundColor: darkMode ? theme.palette.background.default : undefined,
        color: darkMode ? theme.palette.text.primary : undefined,
      }}
    >
      {/* Hero */}
      <div className="text-center py-20 px-6">
        <h1
          className="text-5xl font-bold mb-4"
          style={{ color: darkMode ? theme.palette.common.white : undefined }}
        >
          Who We Are at{" "}
          <span
            className="text-indigo-600"
            style={{
              color: darkMode ? theme.palette.primary.main : undefined,
            }}
          >
            EventBook
          </span>
        </h1>
        <p
          className="text-lg max-w-2xl mx-auto"
          style={{
            color: darkMode ? theme.palette.text.secondary : "#4B5563", // fallback to gray-600
          }}
        >
          Your go-to platform to discover and book events that bring people together.
        </p>
      </div>

      {/* Mission & Vision Cards */}
      <div className="grid sm:grid-cols-2 gap-8 max-w-5xl mx-auto px-6 pb-20">
        <div
          className="bg-gray-100 p-8 rounded-xl shadow-md"
          style={{
            backgroundColor: darkMode ? theme.palette.background.paper : undefined,
          }}
        >
          <h2
            className="text-2xl font-semibold mb-3 text-indigo-600"
            style={{ color: darkMode ? theme.palette.primary.main : undefined }}
          >
            Our Mission
          </h2>
          <p
            style={{
              color: darkMode ? theme.palette.text.secondary : "#374151", // gray-700
            }}
          >
            To bridge communities through seamless event discovery and booking. We empower organizers and delight attendees.
          </p>
        </div>
        <div
          className="bg-gray-100 p-8 rounded-xl shadow-md"
          style={{
            backgroundColor: darkMode ? theme.palette.background.paper : undefined,
          }}
        >
          <h2
            className="text-2xl font-semibold mb-3 text-indigo-600"
            style={{ color: darkMode ? theme.palette.primary.main : undefined }}
          >
            Our Vision
          </h2>
          <p
            style={{
              color: darkMode ? theme.palette.text.secondary : "#374151", // gray-700
            }}
          >
            To become the most trusted event hub globally — one platform, infinite experiences.
          </p>
        </div>
      </div>

      {/* Team */}
      <div
        className="bg-gray-50 py-20 px-6"
        style={{
          backgroundColor: darkMode ? theme.palette.background.default : undefined,
        }}
      >
        <h2
          className="text-3xl font-bold text-center mb-12"
          style={{ color: darkMode ? theme.palette.common.white : undefined }}
        >
          Meet the Makers
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 text-center"
              style={{
                backgroundColor: darkMode ? theme.palette.background.paper : undefined,
                color: darkMode ? theme.palette.text.primary : undefined,
              }}
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3>{member.name}</h3>
              <p
                className="text-sm"
                style={{ color: darkMode ? theme.palette.text.secondary : "#6B7280" /* gray-500 */ }}
              >
                {member.role}
              </p>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-500 hover:underline text-sm mt-2 inline-block"
                style={{ color: darkMode ? theme.palette.primary.main : undefined }}
                onMouseEnter={(e) => {
                  if (darkMode) e.currentTarget.style.color = theme.palette.primary.dark;
                }}
                onMouseLeave={(e) => {
                  if (darkMode) e.currentTarget.style.color = theme.palette.primary.main;
                }}
              >
                LinkedIn
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div
        className="bg-indigo-600 text-white text-center py-16 px-6"
        style={{
          backgroundColor: darkMode ? theme.palette.primary.dark : undefined,
          color: darkMode ? theme.palette.getContrastText(theme.palette.primary.dark) : undefined,
        }}
      >
        <h2 className="text-3xl font-bold mb-4">Start your next adventure</h2>
        <p className="mb-6">Find events you’ll love — or create your own.</p>
        <Link
          to="/"
          className="bg-white text-indigo-600 px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition"
          style={{
            color: darkMode ? theme.palette.primary.dark : undefined,
            backgroundColor: darkMode ? theme.palette.common.white : undefined,
          }}
          onMouseEnter={(e) => {
            if (darkMode) e.currentTarget.style.backgroundColor = theme.palette.grey[300];
          }}
          onMouseLeave={(e) => {
            if (darkMode) e.currentTarget.style.backgroundColor = theme.palette.common.white;
          }}
        >
          Explore Events
        </Link>
      </div>
    </div>
  );
};

export default AboutUs;
