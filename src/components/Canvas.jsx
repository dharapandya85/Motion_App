import React, { useRef, useEffect } from "react";
import { renderTextOnSurface } from "../utils/textRenderer";

const Canvas = ({ frame, text, keypoints }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      renderTextOnSurface(canvasRef.current, text, keypoints);
    }
  }, [frame, text, keypoints]);

  return <canvas ref={canvasRef} width={frame.width} height={frame.height} />;
};

export default Canvas;
