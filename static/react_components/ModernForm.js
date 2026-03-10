function ModernForm({ title = "Contact Us", buttonText = "Submit" }) {
  return (
    <div className="card shadow-lg border-0 rounded-4 m-4 p-4" style={{ maxWidth: "400px", margin: "auto" }} data-aos="fade-up">
      <div className="card-body">
        <h4 className="text-center text-primary mb-3 fw-bold">{title}</h4>
        <hr />
        <form>
          <div className="mb-3">
            <label className="form-label fw-semibold">Name</label>
            <input type="text" className="form-control" placeholder="Enter your name" />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input type="email" className="form-control" placeholder="Enter your email" />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Message</label>
            <textarea className="form-control" rows="3" placeholder="Your message..."></textarea>
          </div>
          <button type="submit" className="btn btn-primary w-100 hvr-float">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

const normalContainer = document.getElementById("modern-form-root");
if (normalContainer) {
  const title = normalContainer.getAttribute("data-title");
  const buttonText = normalContainer.getAttribute("data-button");
  ReactDOM.createRoot(normalContainer).render(
    React.createElement(ModernForm, { title, buttonText })
  );
}
