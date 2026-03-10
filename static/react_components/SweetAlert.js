function SweetAlert({ title, text, icon, buttonText, animate }) {

  const showAlert = () => {
    Swal.fire({
      title,
      text,
      icon,
      confirmButtonText: buttonText || "OK",
      customClass: {
        popup: `animate__animated ${animate || 'animate__fadeInDown'}`
      },
      backdrop: true,
    });
  };

  React.useEffect(() => {
    const btn = document.getElementById("alert-btn");
    if (btn) btn.addEventListener("click", showAlert);

    // Cleanup event listener on unmount
    return () => {
      if (btn) btn.removeEventListener("click", showAlert);
    };
  }, []);

  return null; // no visible UI
}

// Mount component
const alertContainer = document.getElementById("alert-root");

if (alertContainer) {
  const title = alertContainer.getAttribute("data-title");
  const text = alertContainer.getAttribute("data-text");
  const icon = alertContainer.getAttribute("data-icon");
  const buttonText = alertContainer.getAttribute("data-button-text");
  const animate = alertContainer.getAttribute("data-animate");

  ReactDOM.createRoot(alertContainer).render(
    React.createElement(SweetAlert, { title, text, icon, buttonText, animate })
  );
}
