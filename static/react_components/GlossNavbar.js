function GlossNavbar({
  theme = "dark",
  logo = "MyLogo ❤️",
  logoPosition = "left",
  navAlign = "right",
  rounded = true,
  navItems = [],
  animate_type = "animate__bounceInDown",
}) {
  // Transparent + Glassmorphism + Shadow
  const baseStyle = {
    background:
      theme === "dark"
        ? "rgba(25, 25, 25, 0.9)" // semi-transparent dark
        : "rgba(255, 255, 255, 0.7)", // semi-transparent light
    backdropFilter: "blur(5px)", // glass effect
    WebkitBackdropFilter: "blur(5px)",
    boxShadow:
      theme === "dark"
        ? "0 4px 30px rgba(0, 0, 0, 0.2)" // dark shadow
        : "0 4px 30px rgba(0, 0, 0, 0.2)", // light shadow
    border:
      theme === "dark"
        ? "1px solid rgba(255, 255, 255, 0.1)"
        : "1px solid rgba(255, 255, 255, 0.3)",
    borderRadius: rounded ? "20px" : "0",
    transition: "all 0.4s ease-in-out",
  };

  const navbarClass = `navbar navbar-expand-lg navbar-${theme} bg-transparent shadow-lg mb-4 mt-3  ms-5 me-5 animate__animated ${animate_type}`;
  const justifyClass = navAlign === "right" ? "ms-auto" : "me-auto";

  // Text color handling for better readability
  const linkColor = theme === "dark" ? "#ffffff" : "#222222";
  const linkHover = theme === "dark" ? "#00e0ff" : "#007bff";

  return (
    <nav className={navbarClass} style={baseStyle}>
      <div className="container-fluid">
        {logoPosition === "left" && (
          <a
            className="navbar-brand ms-3 fw-bold"
            href="#"
            style={{ color: linkColor }}
          >
            {logo}
          </a>
        )}

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className={`navbar-nav ${justifyClass}`}>
            {navItems.map((item, index) => (
              <li className="nav-item mx-3" key={index}>
                <a
                  className="nav-link hvr-underline-from-left"
                  href={item.link}
                  style={{
                    color: linkColor,
                    fontWeight: 500,
                    transition: "color 0.3s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                  onMouseOver={(e) => (e.target.style.color = linkHover)}
                  onMouseOut={(e) => (e.target.style.color = linkColor)}
                >
                  {item.icon && <i className={item.icon}></i>}{" "}
                  {/* ✅ dynamically render icon */}
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {logoPosition === "right" && (
          <a
            className="navbar-brand ms-3 fw-bold"
            href="#"
            style={{ color: linkColor }}
          >
            {logo}
          </a>
        )}
      </div>
    </nav>
  );
}

// Mount React component
const container = document.getElementById("navbar-root");

const theme = container.getAttribute("data-theme");
const logo = container.getAttribute("data-logo");
const logoPosition = container.getAttribute("data-logo-position");
const navAlign = container.getAttribute("data-nav-align");
const rounded = container.getAttribute("data-rounded") === "true";
const navItems = JSON.parse(container.getAttribute("data-nav-items"));
const animate_type = container.getAttribute("data-animate-type");

ReactDOM.createRoot(container).render(
  React.createElement(GlossNavbar, {
    theme,
    logo,
    logoPosition,
    navAlign,
    rounded,
    navItems,
    animate_type,
  })
);
