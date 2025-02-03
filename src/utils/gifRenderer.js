import GIF from "gif.js";

export const generateGifWithText = (gifURL, text,motionData) => {
  const gif = new GIF({
    workers: 2,
    quality: 10,
  });
  const image = new Image();
  image.src = gifURL;
  image.onload=() => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width =image.width;
    canvas.height = image.height;

    motionData.forEach((frameMotion, index) => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0);

    // Add text overlay
    context.font = "bold 24px Arial";
    context.fillStyle = "white";
    context.strokeStyle = "black";
    context.lineWidth = 2;
    context.textAlign = "center";
    const x = frameMotion.x || canvas.width / 2;
    const y = frameMotion.y || canvas.height - 50;

    context.strokeText(text, x, y);
    context.fillText(text, x, y);

    gif.addFrame(canvas, { delay: 100 });
  });
  gif.render();
};
  return new Promise((resolve) => {
    gif.on("finished", (blob) => resolve(blob));
    
  });
};
