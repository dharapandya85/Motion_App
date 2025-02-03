import React, { useState } from "react";
import GifUploader from "./components/GifUploader";
import GifEditor from "./components/GifEditor";

const App = () => {
  const [gifURL, setGifURL] = useState(null);
  

  const handleGifUpload =  (fileURL) => {
    setGifURL(fileURL);
    
  };

  return (
    <div className="app">
      <h1>Motion App</h1>
      <GifUploader onUpload={handleGifUpload} />
      {gifURL && <GifEditor gifURL={gifURL}  />}
    </div>
  );
};

export default App;
