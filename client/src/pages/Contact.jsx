import React from "react";
import { useTheme } from "@mui/material/styles";

const Contact = () => {
  const theme = useTheme();
  const darkMode = theme.palette.mode === "dark";

  const inputStyles = {
    backgroundColor: darkMode ? theme.palette.background.paper : undefined,
    borderColor: darkMode ? theme.palette.divider : undefined,
    color: darkMode ? theme.palette.text.primary : undefined,
  };

  return (
    <div
      className="min-h-screen text-gray-800"
      style={{
        color: darkMode ? theme.palette.common.white : undefined,
      }}
    >
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1
          className="text-4xl font-bold mb-6 text-center"
          style={{
            color: darkMode ? theme.palette.common.white : undefined,
          }}
        >
          Contact{" "}
          <span
            className="text-indigo-600"
            style={{ color: darkMode ? theme.palette.primary.main : undefined }}
          >
            EventBook
          </span>
        </h1>
        <p
          className="text-center mb-10"
          style={{
            color: darkMode ? theme.palette.text.secondary : "#4B5563", // gray-600
          }}
        >
          We'd love to hear from you! Whether you have a question about features,
          pricing, or anything else, our team is ready to answer all your questions.
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div>
            <h2
              className="text-2xl font-semibold mb-4"
              style={{ color: darkMode ? theme.palette.common.white : undefined }}
            >
              Get In Touch
            </h2>
            <p className="mb-2" style={{ color: darkMode ? theme.palette.common.white : undefined }}>
              <strong>Address:</strong> 123 Event Street, Event City, EC 12345
            </p>
            <p className="mb-2" style={{ color: darkMode ? theme.palette.common.white : undefined }}>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:info@eventbook.com"
                className="text-indigo-500 hover:underline"
                style={{ color: darkMode ? theme.palette.primary.main : undefined }}
              >
                info@eventbook.com
              </a>
            </p>
            <p className="mb-2" style={{ color: darkMode ? theme.palette.common.white : undefined }}>
              <strong>Phone:</strong>{" "}
              <a
                href="tel:+1234567890"
                className="text-indigo-500 hover:underline"
                style={{ color: darkMode ? theme.palette.primary.main : undefined }}
              >
                (123) 456-7890
              </a>
            </p>
          </div>

          {/* Contact Form */}
          <form className="space-y-4">
            <div>
              <label
                className="block mb-1 font-medium"
                style={{ color: darkMode ? theme.palette.common.white : undefined }}
              >
                Name
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 border rounded-lg"
                style={{
                  ...inputStyles,
                  borderStyle: "solid",
                  borderWidth: 1,
                }}
              />
            </div>
            <div>
              <label
                className="block mb-1 font-medium"
                style={{ color: darkMode ? theme.palette.common.white : undefined }}
              >
                Email
              </label>
              <input
                type="email"
                required
                className="w-full px-4 py-2 border rounded-lg"
                style={{
                  ...inputStyles,
                  borderStyle: "solid",
                  borderWidth: 1,
                }}
              />
            </div>
            <div>
              <label
                className="block mb-1 font-medium"
                style={{ color: darkMode ? theme.palette.common.white : undefined }}
              >
                Message
              </label>
              <textarea
                rows="4"
                required
                className="w-full px-4 py-2 border rounded-lg"
                style={{
                  ...inputStyles,
                  borderStyle: "solid",
                  borderWidth: 1,
                }}
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
              style={{
                backgroundColor: darkMode ? theme.palette.primary.main : undefined,
                color: darkMode ? theme.palette.common.white : undefined,
              }}
              onMouseEnter={(e) => {
                if (darkMode) e.currentTarget.style.backgroundColor = theme.palette.primary.dark;
              }}
              onMouseLeave={(e) => {
                if (darkMode) e.currentTarget.style.backgroundColor = theme.palette.primary.main;
              }}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
