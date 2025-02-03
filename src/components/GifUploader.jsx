import { useState } from 'react';

export default function GifUploader() {
  const [gif, setGif] = useState(null);
  const [text, setText] = useState('');
  const handleUpload = (event) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'image/gif') {
      const reader = new FileReader();
      reader.onload = (e) => setGif(e.target?.result);
      reader.readAsDataURL(file);
    } else {
      alert('Please upload a valid GIF file.');
    }
  };
  const handleTextChange = (event) => {
    setText(event.target.value);
  };
  return (
    <div className="p-4">
      <label className="block text-lg font-bold">Upload GIF:</label>
      <input type="file" accept="image/gif" onChange={handleUpload} className="mt-2" />
      {gif && (
        <div className="mt-4">
          
          <img src={gif} alt="Uploaded GIF" className="border rounded-lg shadow-md" />
          {text && (
            <p className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl bg-black/50 p-2 rounded">
              {text}
            </p>
          )}
          <input
            type="text"
            placeholder="Add your text here..."
            value={text}
            onChange={handleTextChange}
            className="mt-3 p-2 border rounded-md w-full"
          />

          
        </div>
      )}
    </div>
  );
}
