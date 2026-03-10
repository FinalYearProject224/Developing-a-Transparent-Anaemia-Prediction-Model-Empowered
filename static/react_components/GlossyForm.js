function AdminLoginCard({ title, icon, action, redirect }) {

  function handleSubmit(e) {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    fetch(action, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    })
    .then(res => res.json())
    .then(data => {
      if (data.status === "success") {
        Swal.fire(title, "Login successful!", "success").then(() => {
          window.location.href = redirect;
        });
      } else {
        Swal.fire("Oops 😢", "Invalid credentials!", "error");
      }
    });
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div 
        className="card shadow-lg rounded-4 p-4"
        style={{
          width: "22rem",
          background: "rgba(192, 226, 80, 0.44)",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",
          border: "1px solid rgba(208, 182, 213, 0.99)",
          boxShadow: "5px 5px 15px rgba(0,0,0,0.3), -5px -5px 15px rgba(255,255,255,0.5)"
        }}
      >
        <h4 className="text-center text-warning fw-bold mb-3">
          <i className={icon}></i> {title}
        </h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              name="username"
              className="form-control shadow-sm"
              placeholder="Username"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="password"
              className="form-control shadow-sm"
              placeholder="Password"
              required
            />
          </div>
          <button type="submit" className="btn btn-danger w-100 rounded-3 shadow-sm">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

// Grab HTML attributes and render
const container = document.getElementById("admin-login-root");
const title = container.getAttribute("data-title");
const icon = container.getAttribute("data-icon");
const action = container.getAttribute("data-action");
const redirect = container.getAttribute("data-redirect");

ReactDOM.createRoot(container).render(
  React.createElement(AdminLoginCard, { title, icon, action, redirect })
);
