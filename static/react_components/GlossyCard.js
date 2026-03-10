function GlossyCard({ title, text, subtext }) {
  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.5)',
    backdropFilter: 'blur(5px)',
    WebkitBackdropFilter: 'blur(5px)',
    border: '1px solid rgba(248, 240, 3, 1)',
    borderTopLeftRadius: '60px',
    borderTopRightRadius: '60px',
    borderBottomLeftRadius: '10px',
    borderBottomRightRadius: '10px',
    color: '#0a0a0aff',
    padding: '25px',
    margin: '80px',
    textAlign: 'justify',
    boxShadow: '0 8px 25px rgba(0,0,0,0.4)',
    transition: 'transform 0.3s ease-in-out',
  };

  const hoverStyle = {
    transform: 'scale(1.02)'
  };

  const [isHover, setIsHover] = React.useState(false);

  return (
    <div 
      style={{ ...cardStyle, ...(isHover ? hoverStyle : {}) }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <h4 className="fw-bold">{title}</h4>
      <hr style={{ borderColor: '#09f1e9ff', margin: '10px 0' }} />
      <p>{text}</p>
      {subtext && <p className="text-muted">{subtext}</p>}
    </div>
  );
}

// Get data from HTML
const container = document.getElementById("card-root");
const title = container.getAttribute("data-title");
const text = container.getAttribute("data-text");
const subtext = container.getAttribute("data-subtext");

ReactDOM.createRoot(container).render(
  React.createElement(GlossyCard, { title, text, subtext })
);
