
const configs = {
        dots: {
            particles: {
                number: { value: 70 },
                color: { value: "#ffffff" },
                shape: { type: "circle" },
                move: { enable: true, speed: 2 },
                opacity: { value: 0.6 },
                size: { value: 3 },
                links: { enable: true, color: "#00aaff" }
            },
            interactivity: { events: { onhover: { enable: true, mode: "repulse" } } },
            background: { color: "#0d1117" }
        },
        stars: {
            particles: {
                number: { value: 80 },
                shape: { type: "star" },
                color: { value: ["#ffffff", "#ffdd00", "#00aaff", "#ff66aa"] },
                opacity: { value: 0.8 },
                size: { value: { min: 2, max: 6 } },
                move: { enable: true, speed: 0.5 },
                links: { enable: true, distance: 100, color: "#ffffff", opacity: 0.4, width: 1 }
            },
            interactivity: { events: { onhover: { enable: true, mode: "grab" } } },
            background: { color: "#0d1117" }
        },
        fire: {
            particles: {
                number: { value: 50 },
                color: { value: ["#ff6600", "#ffaa00"] },
                shape: { type: "circle" },
                move: { enable: true, direction: "top", speed: 2, out_mode: "out" },
                opacity: { value: 0.7 },
                size: { value: { min: 2, max: 4 } }
            },
            interactivity: { events: { onhover: { enable: false } } },
            background: { color: "#0d1117" }
        },
        network: {
            particles: {
                    number: { value: 80 },
                    shape: { type: 'circle' },
                    color: { value: '#880ef3ff' },
                    line_linked: { enable: true, distance: 120, color: '#f30e0eff', opacity: 0.4, width: 1 },
                    opacity: { value: 0.7 },
                    size: { value: 3 },
                    move: { enable: true, speed: 0.5 }
                },
                interactivity: { events: { onhover: { enable: true, mode: 'grab' } } }
        },
        snow: {
            particles: {
                    number: { value: 120 },
                    shape: { type: 'circle' },
                    color: { value: '#ffffff' },
                    opacity: { value: 0.8 },
                    size: { value: 3 },
                    move: { enable: true, speed: 1, direction: 'bottom' }
                },
                interactivity: { events: { onhover: { enable: true, mode: 'repulse' } } }

        },
        bubbles: {
            particles: {
                    number: { value: 50 },
                    shape: { type: 'circle' },
                    color: { value: '#00ccff' },
                    opacity: { value: 0.7 },
                    size: { value: 6 },
                    move: { enable: true, speed: 1.2, out_mode: 'out' }
                },
                interactivity: { events: { onhover: { enable: true, mode: 'bubble' } } }
        },
        confetti: {
            particles: {
                    number: { value: 80 },
                    shape: { type: 'circle' },
                    color: { value: ['#ff0000','#00ff00','#0000ff','#ffff00'] },
                    opacity: { value: 0.9 },
                    size: { value: 5 },
                    move: { enable: true, speed: 2, out_mode: 'out' }
                },
                interactivity: { events: { onhover: { enable: true, mode: 'repulse' } } }

        },
        galaxy: {
            particles: {
                    number: { value: 100 },
                    shape: { type: 'circle' },
                    color: { value: '#ffff00' },
                    opacity: { value: 1 },
                    size: { value: 2 },
                    move: { enable: true, speed: 5, direction: 'top', out_mode: 'out' }
                },
                interactivity: { events: { onhover: { enable: true, mode: 'repulse' } } }
        },
        wave: {
            particles: {
                    number: { value: 100 },
                    shape: { type: 'circle' },
                    color: { value: '#00ffff' },
                    opacity: { value: 0.7 },
                    size: { value: 3 },
                    move: { enable: true, speed: 1, out_mode: 'out', direction: 'none' }
                },
                interactivity: { events: { onhover: { enable: true, mode: 'repulse' } } }
        }
    };


// Your React component
function ParticlesBackground({ type = "dots" }) {
  React.useEffect(() => {
    if (window.tsParticles) {
      tsParticles.load("particles-js", configs[type] || configs.dots);
    }
  }, [type]);

  return React.createElement("div", {
    id: "particles-js",
    style: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: -1
    }
  });
}

// Grab the container
const container = document.getElementById("bg");
const type = container.getAttribute("data-type");

// Create React root and render
const bg = ReactDOM.createRoot(container);
bg.render(React.createElement(ParticlesBackground, { type: type }));
