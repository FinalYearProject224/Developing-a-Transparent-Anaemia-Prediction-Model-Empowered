function CardComponent({ title, text }) {
  return (
    <div className="card shadow-sm mx-3" style={{ width: "18rem", borderRadius: "1rem" }}>
      <div className="card-body">
        <h5 className="card-title text-primary">{title}</h5>
        <hr />
        <p className="card-text">{text}</p>
        <button className="btn btn-primary">Learn More</button>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="d-flex justify-content-center">

      <CardComponent 
        title="Network Intrusion Detection" 
        text="Hybrid Deep Learning Model using Seq2Seq & ConvLSTM." 
      />
      <CardComponent 
        title="Seq2Seq Analyzer" 
        text="Sequence-based feature extraction and prediction." 
      />
      <CardComponent 
        title="ConvLSTM Subnet" 
        text="Convolutional LSTM subnet for temporal learning." 
      />
    </div>
    
  );
}

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<App />);