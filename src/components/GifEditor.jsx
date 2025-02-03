import React, { useRef, useState, useEffect } from 'react';

const GifEditor = () => {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const [gif, setGif] = useState(null);
  const [text, setText] = useState(null);
  const [isTextAdded, setIsTextAdded] = useState(false);
  useEffect(() => {
    if (gif) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      video.onloadstart = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
      };

      video.ontimeupdate = () => {
        // Draw the video frame on the canvas and overlay text if applicable
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas before drawing new frame
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        if (isTextAdded) {
          ctx.font = '30px Arial';
          ctx.fillStyle = 'white';
          ctx.fillText(text, 10, 50);
        }
      };
      
    }
  }, [gif,text,isTextAdded]);

  const handleGifUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'image/gif') {
      setGif(URL.createObjectURL(file));
    }else {
      alert('Please upload a valid GIF.');
    }
  };

  const handleTextOverlay = () => {
    setIsTextAdded(true);
  };
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleRemoveGif = () => {
    setGif(null);
    setText("");
    setIsTextAdded(false);
  };

  

  return (
    <div className="gif-editor">
      <input type="file" onChange={handleGifUpload} accept="image/gif" disabled={!!gif} />
      {gif && (
        <div>
          <video ref={videoRef} src={gif} autoPlay loop muted>
            Your browser does not support the video tag.
          </video>
      <canvas ref={canvasRef} style={{ border: '1px solid black' }}></canvas>
      <div>
            <input
              type="text"
              value={text}
              onChange={handleTextChange}
              placeholder="Enter text"
            />
            <button onClick={handleTextOverlay}>Add Text</button>
          </div>
          <button onClick={handleRemoveGif}>Remove GIF</button>
        </div>
      )}
      
     
    </div>
  );
};

export default GifEditor;
