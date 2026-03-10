function UserRegistrationCard({ title, icon, action, redirect }) {
  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    fetch(action, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          Swal.fire(title, "Registration successful 🎉", "success").then(() => {
            window.location.href = redirect;
          });
        } else {
          Swal.fire("Error ", "Please try again!", "error");
        }
      });
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
      <div
        className="card p-4 shadow-lg position-relative  mb-5"
        style={{
          width: "25rem",
          borderRadius: "25px",
          background: "rgba(30, 30, 30, 0.55)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          overflow: "hidden",
        }}
      >
        {/* Neon Border Glow */}
        <div
          style={{
            content: '""',
            position: "absolute",
            top: "-2px",
            left: "-2px",
            right: "-2px",
            bottom: "-2px",
            background: "linear-gradient(90deg, #1f69ea70 0%, #1f69eaff 10%)",
            
            zIndex: 0,
            filter: "blur(15px)",
            borderRadius: "25px",
            opacity: 0.6,
          }}
        ></div>

        <div className="card-body position-relative" style={{ zIndex: 1 }}>
          <h3 className="text-center fw-bold text-light mb-4">
            <i className={`${icon}  me-2`}></i> {title}
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control glossy-input"
                id="name"
                name="name"
                placeholder="Full Name"
                required
              />
              <label htmlFor="name">Full Name</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control glossy-input"
                id="email"
                name="email"
                placeholder="Email Address"
                required
              />
              <label htmlFor="email">Email Address</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control glossy-input"
                id="username"
                name="username"
                placeholder="Username"
                required
              />
              <label htmlFor="username">Username</label>
            </div>

            <div className="form-floating mb-4">
              <input
                type="password"
                className="form-control glossy-input"
                id="password"
                name="password"
                placeholder="Password"
                required
              />
              <label htmlFor="password">Password</label>
            </div>
            
            <button
              type="submit"
              className="btn btn-grad btn-primary w-100 rounded-pill py-2 fw-bold">
              Register Now 
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// React render from HTML
const regContainer = document.getElementById("user-register-root");
if (regContainer) {
  const title = regContainer.getAttribute("data-title");
  const icon = regContainer.getAttribute("data-icon");
  const action = regContainer.getAttribute("data-action");
  const redirect = regContainer.getAttribute("data-redirect");

  ReactDOM.createRoot(regContainer).render(
    React.createElement(UserRegistrationCard, {
      title,
      icon,
      action,
      redirect,
    })
  );
}
