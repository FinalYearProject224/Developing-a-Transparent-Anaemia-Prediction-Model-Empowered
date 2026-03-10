function CardComponent({ card, isLoading }) {
  const getColor = (value) => {
    if (!value) return "#6a11cb";
    const num = parseFloat(value.toString().replace("%", ""));
    if (num >= 90) return "#28a745"; // green
    if (num >= 70) return "#ffc107"; // yellow
    return "#dc3545"; // red
  };

  return (
    <div
      className={`card m-3 shadow-lg rounded-4 hvr-grow animate__animated ${
        isLoading ? "animate__pulse" : "animate__fadeInUp"
      }`}
      style={{
        width: "20rem",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
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
            ? "linear-gradient(90deg, #e1c4dfaf 25%, #db61d3af 50%, #e00ad2af 75%)"
            : "linear-gradient(210deg, #d5a9e8f6, #b328eff6)",
          fontSize: "1.1rem",
        }}
      >
        {isLoading ? <span className="placeholder col-6"></span> : card.title || "Card Title"}
      </div>

      <div className="card-body">
        {card.text && (
          <p className="card-text fw-bold text-danger text-center mb-3">
            {isLoading ? <span className="placeholder col-7"></span> : card.text}
          </p>
        )}

        {card.data &&
          Object.entries(card.data).map(([key, value], index) => {
            const width = isLoading ? 0 : parseFloat(value);
            return (
              <div key={index} className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <span className="text-secondary fw-semibold">{key}</span>
                  <span
                    className="badge fw-bold"
                    style={{
                      background: getColor(width),
                      color: "white",
                      fontSize: "0.85rem",
                      minWidth: "50px",
                    }}
                  >
                    {isLoading ? "--" : `${value}%`}
                  </span>
                </div>
                <div className="progress" style={{ height: "8px", borderRadius: "5px" }}>
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{
                      width: `${width}%`,
                      background: getColor(width),
                      transition: "width 1.2s ease-in-out",
                    }}
                    aria-valuenow={width}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
            );
          })}
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
  { isLoading: true, title: "", text: "", data: { Accuracy: 0, Precision: 0, Recall: 0, "F1 Score": 0 } },
  { isLoading: true, title: "", text: "", data: { Accuracy: 0, Precision: 0, Recall: 0, "F1 Score": 0 } },
  { isLoading: true, title: "", text: "", data: { Accuracy: 0, Precision: 0, Recall: 0, "F1 Score": 0 } },
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
