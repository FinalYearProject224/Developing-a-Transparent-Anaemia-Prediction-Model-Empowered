function CardComponent({ card, isLoading }) {
  return (
    <div
      className={`card m-3 shadow-lg rounded-4 hvr-grow animate__animated ${
        isLoading ? "animate__pulse" : "animate__fadeInUp"
      }`}
      style={{
        width: "20rem",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        background: isLoading
          ? "linear-gradient(120deg, #f6f7f8 25%, #edeef1 50%, #f6f7f8 75%)"
          : "rgba(255, 255, 255, 1)",
        backgroundSize: "200% 100%",
        animation: isLoading ? "shimmer 1.5s infinite" : "none",
        transition: "transform 0.3s, box-shadow 0.3s",
      }}
    >
      {/* Header */}
      <div
        className="card-header text-center text-white fw-bold rounded-top"
        style={{
          background: isLoading
            ? "linear-gradient(90deg, #6a11cb 25%, #83a7e6b6 50%, #2575fc 75%)"
            : "linear-gradient(210deg, #bc0795ff, #b71af0ff)",
          fontSize: "1.1rem",
        }}
      >
        {isLoading ? <span className="placeholder col-6"></span> : card.title || "Card Title"}
      </div>

      <div className="card-body">
        <p className="card-text fw-bold text-dark text-center mb-3">
          {isLoading ? <span className="placeholder col-7"></span> : card.text || ""}
        </p>
      </div>
    </div>
  );
}

// === SHIMMER EFFECT CSS ===
const shimmerStyle = document.createElement("style");
shimmerStyle.innerHTML = `
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
.placeholder {
  display: inline-block;
  height: 1rem;
  background: linear-gradient(120deg, #d1d5ff 25%, #e3e6ff 50%, #d1d5ff 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite linear;
  border-radius: 4px;
}
`;
document.head.appendChild(shimmerStyle);

// === RENDER FUNCTION ===
function renderCards(cards) {
  const root = ReactDOM.createRoot(document.getElementById("cards-root"));
  root.render(
    <div className="d-flex flex-wrap justify-content-center">
      {cards.map((card, index) => (
        <CardComponent key={index} card={card} isLoading={card.isLoading} />
      ))}
    </div>
  );
}

// === INITIAL SHIMMER PLACEHOLDERS ===
let cards = [
  { isLoading: true, title: "", text: "" },
  { isLoading: true, title: "", text: "" },
  { isLoading: true, title: "", text: "" },
];
renderCards(cards);

// === GET DATA FROM FLASK & UPDATE ONE CARD AT A TIME ===
setTimeout(() => {
  const cardData = JSON.parse(document.getElementById("card-data").textContent);

  cardData.forEach((realCard, index) => {
    setTimeout(() => {
      cards[index] = { ...realCard, isLoading: false }; // Replace shimmer with actual card
      renderCards(cards); // Update view
    }, index * 1000); // Each card appears after 1 second
  });
}, 800);
