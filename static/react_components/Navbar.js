function Navbar({ 
  theme = "dark", 
  logo = "MyLogo", 
  logoPosition = "left", 
  navAlign = "right", 
  rounded = true, 
  navItems = [],
  animate_type = "animate__bounceInDown",
}) {

const navbarClass = `navbar navbar-expand-lg navbar-${theme} bg-${theme} shadow-lg mb-4 mt-4 ms-5 me-5 animate__animated ${animate_type}`;
const navStyle = rounded ? { borderBottomLeftRadius: "50px", borderBottomRightRadius: "50px",borderTopRightRadius: "50px", borderTopLeftRadius: "50px" } : {};

  const justifyClass = navAlign === "right" ? "ms-auto" : "me-auto";

  return (
    <nav className={navbarClass} style={navStyle}>
      <div className="container-fluid">
        {logoPosition === "left" && <a className="navbar-brand ms-3" href="#">{logo}</a>}

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className={`navbar-nav ${justifyClass}`}>
            {navItems.map((item, index) => {
              // Check if current URL matches the item's link
              const isActive = window.location.pathname === item.link;

              return (
                <li className="nav-item mx-2" key={index}>
                  <a
                    className={`nav-link hvr-underline-from-left ${isActive ? "active" : ""}`}
                    href={item.link}
                  >
                    {item.name}
                  </a>
                </li>
              );
        })}

          </ul>
        </div>

        {logoPosition === "right" && <a className="navbar-brand ms-3" href="#">{logo}</a>}
      </div>
    </nav>
  );
}
const container = document.getElementById("navbar-root");

  const theme = container.getAttribute("data-theme");
  const logo = container.getAttribute("data-logo");
  const logoPosition = container.getAttribute("data-logo-position");
  const navAlign = container.getAttribute("data-nav-align");
  const rounded = container.getAttribute("data-rounded") === "true";
  const navItems = JSON.parse(container.getAttribute("data-nav-items"));
  const animate_type = container.getAttribute("data-animate-type");

  ReactDOM.createRoot(container).render(
    React.createElement(Navbar, { theme, logo, logoPosition, navAlign, rounded, navItems, animate_type })
  );