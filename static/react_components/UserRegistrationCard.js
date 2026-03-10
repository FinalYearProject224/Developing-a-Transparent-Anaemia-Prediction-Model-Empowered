function UserRegistrationCard({ title, icon, action, redirect , userLink}) {
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
          Swal.fire({
            title: "Success!",
            text: data.message,       // <-- message from Flask
            icon: "success",
            confirmButtonText: "OK",
            confirmButtonColor: "#3085d6",
            background: "#f0f0f0ff",
            color: "#333",
        }).then(() => {
            window.location.href = redirect;
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: data.message || "Please try again!",
            icon: "error",
            confirmButtonText: "Retry",
            confirmButtonColor: "#d33",
            background: "#fff3f3",
            color: "#900",
        });
        }
      });
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div 
        className="card shadow-lg rounded-4 p-4 mb-5"
        style={{
          width: "22rem",
          background: "rgba(165, 9, 243, 0.46)",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",
          border: "1px solid rgba(255, 255, 255, 0.6)",
          boxShadow: "5px 5px 15px rgba(0,0,0,0.3), -5px -5px 15px rgba(255,255,255,0.5)"
        }}
      >
        <h4 className="text-center text-white fw-bold mb-3">
          <i className={icon}></i> {title}
        </h4>        

        <div>

          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control shadow-sm"
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
                className="form-control shadow-sm"
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
                className="form-control shadow-sm"
                id="username"
                name="username"
                placeholder="Username"
                required
              />
              <label htmlFor="username">Username</label>
            </div>

            <div className=" form-floating mb-4">
              <input
                type="password"
                className="form-control shadow-sm"
                id="password"
                name="password"
                placeholder="Password"
                required
              />
              <label htmlFor="password">Password</label>
            </div>
            <div class="container signin text-white">
                <p>Already have an account? <a 
                  href={userLink} 
                  style={{ 
                    color: '#eeff00ff',     // bright red
                    fontWeight: 'bold',   // make it bold
                    textShadow: '1px 1px 2px #908c8cff' // subtle dark shadow for pop
              }}
            >
              Login in
            </a>
            .</p>
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
const regContainer = document.getElementById("user-register");
if (regContainer) {
  const title = regContainer.getAttribute("data-title");
  const icon = regContainer.getAttribute("data-icon");
  const action = regContainer.getAttribute("data-action");
  const redirect = regContainer.getAttribute("data-redirect");
  const userLink = regContainer.getAttribute("data-userLink");

  ReactDOM.createRoot(regContainer).render(
    React.createElement(UserRegistrationCard, {
      title,
      icon,
      action,
      redirect,
      userLink
    })
  );
}
