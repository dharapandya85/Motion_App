export const renderTextOnSurface = (canvas, text, keypoints) => {
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    ctx.font = "bold 24px Arial";
    ctx.fillStyle = "white";
  
    keypoints.forEach((point) => {
      ctx.save();
      ctx.translate(point.x, point.y);
      ctx.rotate(point.angle || 0);
      ctx.fillText(text, 0, 0);
      ctx.restore();
    });
  };
  