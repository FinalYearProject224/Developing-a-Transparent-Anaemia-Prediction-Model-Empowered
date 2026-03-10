  const { useEffect, useRef } = React;

  function VantaBackground({ type = "waves", options = {} }) {
    const vantaRef = useRef(null);
    const effectRef = useRef(null);

    useEffect(() => {
      if (effectRef.current) effectRef.current.destroy();

      const defaultOptions = {
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        minHeight: 200,
        minWidth: 200,
        scale: 1.0,
        scaleMobile: 1.0,
      };
      const vantaOptions = Object.assign({}, defaultOptions, options);
      const options = { el: "#vanta-bg", mouseControls:true, touchControls:true, minHeight:200, minWidth:200 };
      switch (type.toLowerCase()) {
        case "waves":
          effectRef.current = VANTA.WAVES(
            {...options, color:0x663399, waveHeight:5}
          );
          break;
        case "fog":
          effectRef.current = VANTA.FOG(
            {...options, highlightColor:0xff33cc, midtoneColor:0x00ccff, lowlightColor:0x000000, baseColor:0x111111}
          );
          break;
        case "birds":
          effectRef.current = VANTA.BIRDS(
            {...options, color1:0xff6600, color2:0xffff00, birdSize:0.2, speedLimit:0.2}
          );
          break;
        case "cells":
          effectRef.current = VANTA.CELLS(
            {...options, color1:0xff007f, color2:0x00ffff, size:1.5, speed:2.0}
          );
          break;
        case "globe":
          effectRef.current = VANTA.GLOBE(
            {...options, color:0xff6600, backgroundColor:0x111111, size:1.2}
          );
          break;
        case "clouds":
          effectRef.current = VANTA.CLOUDS(
            {...options, skyColor:0x000000, cloudColor:0xffffff}
          );
          break;
        case "halo":
          effectRef.current = VANTA.HALO(
            {...options, baseColor:0xff6600, backgroundColor:0x111111}
          );
          break;
        default:
          effectRef.current = VANTA.WAVES(
            {...options, color:0x1a9000, waveHeight:30}
          );
      }

      return () => {
        if (effectRef.current) effectRef.current.destroy();
      };
    }, [type, options]);

    return React.createElement("div", { ref: vantaRef, style: { width: "100%", height: "100%" } });
  }

  const rootEl = document.getElementById("vanta-bg");
  const effectType = rootEl.dataset.type || "waves";

  ReactDOM.createRoot(rootEl).render(
    React.createElement(VantaBackground, { type: effectType })
  );
