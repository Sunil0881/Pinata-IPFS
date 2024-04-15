import { useState } from 'react';


function App() {
  const [file, setFile] = useState(null);
  const [fileHash, setFileHash] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert('Please select a file.');
      return;
    }

    // Create form data
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
        method: 'POST',
        body: formData,
        headers: {
          'pinata_api_key': '1475d583085e7c49402b',
          'pinata_secret_api_key': '08bdeddfb343f8e01756cddfce8858e5b85db2ca89d62e3d0261cc1dd621129c'
        },
      });
      const data = await response.json();
      console.log('File pinned successfully:', data);
      setFileHash(data.IpfsHash); // Set the file hash in state
    } catch (error) {
      console.error('Error pinning file:', error);
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label htmlFor="file">Upload PDF file:</label>
        <input 
          type="file" 
          id="file" 
          accept=".pdf" 
          onChange={handleFileChange} 
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      {fileHash && (
        <div>
          <p>File hash: {fileHash}</p>
          <p>IPFS URL: https://gateway.pinata.cloud/ipfs/{fileHash}</p>
        </div>
      )}
    </div>
  );
}

export default App;

