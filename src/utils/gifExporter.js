import GIF from "gif.js";

export const generateGif = (frames) => {
  const gif = new GIF({ workers: 2 });
  frames.forEach((frame) => gif.addFrame(frame.canvas, { delay: frame.delay }));

  return new Promise((resolve) => {
    gif.on("finished", (blob) => resolve(blob));
    gif.render();
  });
};
