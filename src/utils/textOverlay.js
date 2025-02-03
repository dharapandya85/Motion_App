export const applyTextOverlay = (canvas, text) => {
    const context = canvas.getContext("2d");
  
    // Add text overlay with style
    context.font = "bold 24px Arial";
    context.fillStyle = "white";
    context.strokeStyle = "black";
    context.lineWidth = 2;
  
    const x = canvas.width / 2;
    const y = canvas.height - 50;
  
    context.textAlign = "center";
    context.strokeText(text, x, y);
    context.fillText(text, x, y);
  };
  