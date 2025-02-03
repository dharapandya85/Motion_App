import GIF from "gif.js";

export const extractGifFrames = (gifFile) => {
  return new Promise((resolve, reject) => {
    const gif = new GIF({ workers: 2 });

    const frames = [];
    gif.load(gifFile);

    gif.on("parsed", (frameData) => {
      frames.push(frameData);
    });

    gif.on("finished", () => resolve(frames));
    gif.on("error", reject);
  });
};
