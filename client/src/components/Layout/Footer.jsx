import { useTheme } from "@mui/material/styles";

const Footer = () => {
  const theme = useTheme();
  const darkMode = theme.palette.mode === "dark";

  return (
    <footer
      className="bg-gray-50 border-t border-gray-200"
      style={{
        backgroundColor: darkMode ? theme.palette.background.default : undefined,
        borderColor: darkMode ? theme.palette.divider : undefined,
      }}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: darkMode ? theme.palette.common.white : undefined }}
            >
              About Eventora
            </h3>
            <p style={{ color: darkMode ? theme.palette.text.secondary : undefined }}>
              The easiest way to discover and book events in your area. Find concerts, workshops,
              and more.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: darkMode ? theme.palette.common.white : undefined }}
            >
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/events", label: "Events" },
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-gray-600 hover:text-primary-500"
                    style={{
                      color: darkMode ? theme.palette.text.secondary : undefined,
                    }}
                    onMouseEnter={e =>
                      darkMode && (e.currentTarget.style.color = theme.palette.primary.main)
                    }
                    onMouseLeave={e =>
                      darkMode && (e.currentTarget.style.color = theme.palette.text.secondary)
                    }
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: darkMode ? theme.palette.common.white : undefined }}
            >
              Categories
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/events?category=music", label: "Music" },
                { href: "/events?category=sports", label: "Sports" },
                { href: "/events?category=workshop", label: "Workshops" },
                { href: "/events?category=conference", label: "Conferences" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-gray-600 hover:text-primary-500"
                    style={{
                      color: darkMode ? theme.palette.text.secondary : undefined,
                    }}
                    onMouseEnter={e =>
                      darkMode && (e.currentTarget.style.color = theme.palette.primary.main)
                    }
                    onMouseLeave={e =>
                      darkMode && (e.currentTarget.style.color = theme.palette.text.secondary)
                    }
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: darkMode ? theme.palette.common.white : undefined }}
            >
              Contact Us
            </h3>
            <address
              className="not-italic space-y-2"
              style={{ color: darkMode ? theme.palette.text.secondary : undefined }}
            >
              <p>123 Event Street</p>
              <p>Event City, EC 12345</p>
              <p>
                Email:{" "}
                <a
                  href="mailto:info@eventbook.com"
                  className="hover:text-primary-500"
                  style={{
                    color: darkMode ? theme.palette.text.secondary : undefined,
                  }}
                  onMouseEnter={e =>
                    darkMode && (e.currentTarget.style.color = theme.palette.primary.main)
                  }
                  onMouseLeave={e =>
                    darkMode && (e.currentTarget.style.color = theme.palette.text.secondary)
                  }
                >
                  info@eventbook.com
                </a>
              </p>
              <p>
                Phone:{" "}
                <a
                  href="tel:+1234567890"
                  className="hover:text-primary-500"
                  style={{
                    color: darkMode ? theme.palette.text.secondary : undefined,
                  }}
                  onMouseEnter={e =>
                    darkMode && (e.currentTarget.style.color = theme.palette.primary.main)
                  }
                  onMouseLeave={e =>
                    darkMode && (e.currentTarget.style.color = theme.palette.text.secondary)
                  }
                >
                  01285147876
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Copyright */}
        <div
          className="mt-8 pt-8 border-t text-center text-sm"
          style={{
            borderColor: darkMode ? theme.palette.divider : undefined,
            color: darkMode ? theme.palette.text.secondary : undefined,
          }}
        >
          <p>© {new Date().getFullYear()} Eventora. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
