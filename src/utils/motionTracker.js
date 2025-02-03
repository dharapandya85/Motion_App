import cv from "opencv.js";
export const mapMotion = (gifURL, canvas, onComplete) => {
    const context = canvas.getContext("2d");
  
    // Load GIF as video-like frames
    const gif = new Image();
    gif.src = gifURL;
  
    gif.onload = () => {
      canvas.width = gif.width;
      canvas.height = gif.height;
  
      // Initialize OpenCV
      const cap = new cv.VideoCapture(gif);
      const src = new cv.Mat(canvas.height, canvas.width, cv.CV_8UC4);
      const gray = new cv.Mat();
  
      let trackingData = []; // Store motion data per frame
  
      function processFrame() {
        cap.read(src);
        cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);
  
        // Track motion using Optical Flow or feature matching
        const features = new cv.Mat();
        cv.goodFeaturesToTrack(
          gray,
          features,
          100,
          0.01,
          10,
          new cv.Mat(),
          3,
          false
        );
  
        trackingData.push(features.data32F); // Save tracked points
  
        // Display the frame on the canvas
        context.drawImage(gif, 0, 0);
  
        if (trackingData.length < gif.frames) {
          requestAnimationFrame(processFrame);
        } else {
          src.delete();
          gray.delete();
          features.delete();
          onComplete(trackingData); // Pass motion data back to caller
        }
      }
  
      processFrame();
    };
  };
