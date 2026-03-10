function ShimmerTable() {
  return (
    <div className="card shadow-lg border-0 mt-4 fade-in">
      <div className="card-header gradient-header  text-white text-center fs-5 fw-bold rounded-top">
        <i class="fa-solid fa-magnifying-glass-chart"></i> Analyzing Data...
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-striped align-middle mb-0">
            <thead className="table-dark text-center">
              <tr>
                <th style={{ width: "5%" }}>S.No</th>
                <th style={{ width: "70%" }}>Input Features</th>
                <th style={{ width: "25%" }}>Predicted Type</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  <td><div className="shimmer shimmer-sm"></div></td>
                  <td><div className="shimmer shimmer-lg"></div></td>
                  <td><div className="shimmer shimmer-md"></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ResultTable({ results }) {
  return (
    <div className="card shadow-lg border-0 mt-4 fade-in">
      <div className="card-header gradient-header  text-white text-center fs-5 fw-bold rounded-top">
        <i class="fa-solid fa-square-poll-vertical"></i> Prediction Results
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle mb-0">
            <thead className="table-dark text-center">
              <tr>
                <th style={{ width: "5%" }}>S.No</th>
                <th style={{ width: "70%" }}>Input Features</th>
                <th style={{ width: "25%" }}>Predicted Type</th>
              </tr>
            </thead>
            <tbody>
              {results.map((res, index) => (
                <tr
                  key={res.index}
                  className="slide-in-row"
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  <td className="text-center fw-bold">{res.index}</td>
                  <td className="text-center ">
                    <div
                      style={{
                        maxHeight: "100px",
                        overflowY: "auto",
                        fontSize: "0.9rem",
                        color: "#333",
                      }}
                    >
                      {Array.isArray(res.input)
                        ? res.input.join(", ")
                        : res.input}
                    </div>
                  </td>
                  <td
                    className={`fw-bold text-center ${
                      res.predicted === "Normal"
                        ? "text-success"
                        : "text-danger"
                    }`}
                    style={{ fontSize: "1rem" }}
                  >
                    {res.predicted}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Results() {
  const [results, setResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [showTable, setShowTable] = React.useState(false);

  React.useEffect(() => {
    const form = document.getElementById("uploadForm");

    const handleSubmit = async (e) => {
      e.preventDefault();
      const fileInput = document.getElementById("testFile");
      const file = fileInput.files[0];

      if (!file) {
        alert("Please select a file first.");
        return;
      }

      const formData = new FormData();
      formData.append("test_file", file);

      setLoading(true);
      setShowTable(true);

      try {
        const res = await fetch("/user/predict", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        setResults(data.predictions || []);
      } catch (err) {
        console.error("Error:", err);
        alert("Error while predicting. Check console for details.");
        setShowTable(false);
      }

      setLoading(false);
    };

    form.addEventListener("submit", handleSubmit);
    return () => form.removeEventListener("submit", handleSubmit);
  }, []);

  return (
    <div className="fade-in">
      {loading ? (
        <ShimmerTable />
      ) : (
        showTable &&
        results.length > 0 && <ResultTable results={results} />
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("results-root"));
root.render(<Results />);

// Add shimmer, fade-in, and slide-in CSS
const style = document.createElement("style");
style.innerHTML = `
  .fade-in {
    animation: fadeIn 0.6s ease-in-out;
  }
  .gradient-header {
    background: linear-gradient(90deg, #e2abebff, #de83eeff, #cf43e7ff);
    padding: 14px;
    text-shadow: 1px 1px 6px rgba(0,0,0,0.5);
}
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .shimmer {
    background: linear-gradient(100deg, #f6f7f8 20%, #edeef1 50%, #f6f7f8 80%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 5px;
  }
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  .shimmer-sm { height: 14px; width: 40px; }
  .shimmer-md { height: 14px; width: 100px; }
  .shimmer-lg { height: 14px; width: 80%; }

  .slide-in-row {
    opacity: 0;
    transform: translateY(12px);
    animation: slideInRow 0.5s ease-out forwards;
  }
  @keyframes slideInRow {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);
