function TypedComponent({ elementId }) {
  React.useEffect(() => {
    const element = document.getElementById(elementId);
    if (!element) return;

    const stringsArray = JSON.parse(element.getAttribute("data-strings") || "[]");
    const typeSpeed = parseInt(element.getAttribute("data-type-speed") || 80);
    const backSpeed = parseInt(element.getAttribute("data-back-speed") || 0);
    const loop = element.getAttribute("data-loop") === "true";
    const cursorChar = element.getAttribute("data-cursor-char") || "|";
    const startDelay = parseInt(element.getAttribute("data-start-delay") || 0);
    const color = element.getAttribute("data-color") || "#fff";

    // Initialize Typed.js
    new Typed(`#${elementId}`, {
      strings: stringsArray,
      typeSpeed,
      backSpeed,
      loop,
      cursorChar,
      startDelay,
      showCursor: true,
      onStringTyped: () => {
        element.style.color = color;
      }
    });
  }, [elementId]);

  return React.createElement("span", { id: elementId });
}

// Mount React Component
const container = document.getElementById("typed");
const typedRoot = ReactDOM.createRoot(container);
typedRoot.render(React.createElement(TypedComponent, { elementId: "typed" }));
