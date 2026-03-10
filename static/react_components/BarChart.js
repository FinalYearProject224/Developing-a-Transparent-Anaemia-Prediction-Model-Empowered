// === GET CANVAS CONTEXT ===
const ctx = document.getElementById("metricsChart").getContext("2d");

// === SHIMMER PLACEHOLDER DATA ===
const placeholderData = {
  labels: ["Existing", "Proposed", "Extension"],
  datasets: [
    {
      label: "Loading...",
      data: [0, 0, 0],
      backgroundColor: "rgba(200,200,200,0.3)",
      borderRadius: 20,
    },
  ],
};

// === CREATE PLACEHOLDER CHART ===
let metricsChart = new Chart(ctx, {
  type: "bar",
  data: placeholderData,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    animation: { duration: 1200, easing: "easeOutCubic" },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: { stepSize: 10, color: "#555", font: { size: 14, weight: "500" } },
        grid: { color: "rgba(0,0,0,0.05)" },
      },
      x: {
        grid: { display: false },
        ticks: { color: "#333", font: { size: 13, weight: "500" } },
      },
    },
  },
});

// === LOAD REAL DATA WITH PREMIUM ANIMATION ===
setTimeout(() => {
  const graphData = JSON.parse(document.getElementById("graph-data").textContent);

  if (!Array.isArray(graphData)) {
    console.error("graphData is not an array:", graphData);
    return;
  }

  const metrics = ["Accuracy", "Precision", "Recall", "F1 Score"];
  const labels = graphData.map((d) => d.model);

  const colors = [
    "rgba(106,17,203,0.8)",
    "rgba(37,117,252,0.8)",
    "rgba(255,107,107,0.8)",
    "rgba(255,159,64,0.8)",
  ];

  const datasets = metrics.map((metric, i) => ({
    label: metric,
    data: graphData.map((d) => d[metric]),
    backgroundColor: colors[i % colors.length],
    borderRadius: 8,
    hoverBackgroundColor: colors[i % colors.length].replace("0.8", "1"),
    barPercentage: 0.9,
    categoryPercentage: 0.6,
  }));

  // Update chart with real data
  metricsChart.data.labels = labels;
  metricsChart.data.datasets = datasets;

  // Premium look and hover
  metricsChart.options.plugins.legend.display = true;
  metricsChart.options.plugins.legend.labels.color = "#333";
  metricsChart.options.plugins.legend.labels.font = { size: 14, weight: "600" };
  metricsChart.options.plugins.tooltip.enabled = true;
  metricsChart.options.plugins.tooltip.mode = "nearest"; // show only hovered bar
  metricsChart.options.plugins.tooltip.intersect = true;
  metricsChart.options.plugins.tooltip.backgroundColor = "rgba(50,50,50,0.9)";
  metricsChart.options.plugins.tooltip.titleColor = "#fff";
  metricsChart.options.plugins.tooltip.bodyColor = "#fff";
  metricsChart.options.hover.mode = "nearest";
  metricsChart.options.hover.intersect = true;

  metricsChart.update({ duration: 1800, easing: "easeOutQuart" });
}, 1000); // simulate shimmer loading delay

