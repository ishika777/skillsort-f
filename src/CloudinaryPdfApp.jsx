// CloudinaryPdfApp.jsx
import { useState, useEffect } from 'react';

function CloudinaryPdfApp() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedPdf, setUploadedPdf] = useState(null);
  const [uploadedPdfs, setUploadedPdfs] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState('');

//   CLOUD_NAME=ishika05
// CLOUDINARY_API_KEY=391721884746814
  const cloudName = 'ishika05';
  const uploadPreset = 'qv1lqnae';
  const apiKey = '391721884746814';

  useEffect(() => {
    // Fetch existing PDFs when component mounts
    fetchPdfs();
  }, []);

  const fetchPdfs = async () => {
    try {
      // This would typically be your backend API endpoint
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/resources/image`, {
        headers: {
          Authorization: `Basic ${btoa(`${apiKey}:`)}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        // Filter for only PDF files (this is an example, you might need to adjust based on how you tag/store PDFs)
        const pdfFiles = data.resources.filter(resource => 
          resource.format === 'pdf' || resource.resource_type === 'raw' && resource.secure_url.endsWith('.pdf')
        );
        setUploadedPdfs(pdfFiles);
      } else {
        setMessage('Error fetching PDFs. You may need to implement a backend for this feature.');
      }
    } catch (error) {
      console.error('Error fetching PDFs:', error);
      setMessage('Error fetching PDFs. You may need to implement a backend for this feature.');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
      setMessage('');
    } else {
      setSelectedFile(null);
      setMessage('Please select a PDF file');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage('Please select a PDF file first');
      return;
    }

    setIsUploading(true);
    setMessage('Uploading...');

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('upload_preset', uploadPreset);
      formData.append('resource_type', 'raw'); // Important for PDFs

      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        setUploadedPdf(data);
        setMessage('PDF uploaded successfully!');
        fetchPdfs(); // Refresh the list
      } else {
        setMessage('Error uploading PDF. Check your Cloudinary configuration.');
      }
    } catch (error) {
      console.error('Error uploading PDF:', error);
      setMessage('Error uploading PDF: ' + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownload = async (url, filename) => {
    try {
      setMessage('Downloading PDF...');
      
      // Fetch the PDF file
      const response = await fetch(url);
      const blob = await response.blob();
      
      // Create a download link
      const downloadUrl = window.URL.createObjectURL(
        new Blob([blob], { type: 'application/pdf' })
      );
      
      // Create a temporary link and trigger the download
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', filename || 'downloaded-document.pdf');
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
      
      setMessage('PDF downloaded successfully!');
    } catch (error) {
      console.error('Error downloading PDF:', error);
      setMessage('Error downloading PDF: ' + error.message);
    }
  };

  return (
    <div className="pdf-app">
      <h1>PDF Upload & Download</h1>
      
      <div className="upload-section">
        <h2>Upload PDF</h2>
        <input 
          type="file" 
          accept="application/pdf" 
          onChange={handleFileChange}
          disabled={isUploading}
        />
        
        <button 
          onClick={handleUpload} 
          disabled={!selectedFile || isUploading}
        >
          {isUploading ? 'Uploading...' : 'Upload PDF'}
        </button>
        
        {selectedFile && (
          <p>Selected file: {selectedFile.name}</p>
        )}
      </div>

      {message && (
        <div className="message">
          <p>{message}</p>
        </div>
      )}

      {uploadedPdf && (
        <div className="recent-upload">
          <h2>Recently Uploaded</h2>
          <div className="pdf-item">
            <span>{uploadedPdf.original_filename}</span>
            <button onClick={() => handleDownload(uploadedPdf.secure_url, uploadedPdf.original_filename)}>
              Download
            </button>
          </div>
        </div>
      )}

      <div className="pdf-list">
        <h2>Your PDFs</h2>
        {uploadedPdfs.length > 0 ? (
          <ul>
            {uploadedPdfs.map((pdf, index) => (
              <li key={index} className="pdf-item">
                <span>{pdf.public_id.split('/').pop()}</span>
                <button onClick={() => handleDownload(pdf.secure_url, pdf.public_id.split('/').pop())}>
                  Download
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No PDFs found. Upload your first PDF!</p>
        )}
      </div>

      <div className="setup-instructions">
        <h3>Setup Instructions</h3>
        <p>To use this app, you need to:</p>
        <ol>
          <li>Create a Cloudinary account at <a href="https://cloudinary.com" target="_blank" rel="noopener noreferrer">cloudinary.com</a></li>
          <li>Get your Cloud Name, API Key, and create an Upload Preset</li>
          <li>Replace the placeholder values in the code with your actual credentials</li>
          <li>For a production app, you should use environment variables and a backend service to handle the API keys securely</li>
        </ol>
      </div>

      <style jsx>{`
        .pdf-app {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          font-family: Arial, sans-serif;
        }
        
        h1 {
          color: #2c3e50;
          text-align: center;
        }
        
        .upload-section {
          background: #f7f9fc;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 20px;
        }
        
        input[type="file"] {
          display: block;
          margin-bottom: 15px;
          width: 100%;
        }
        
        button {
          background: #3498db;
          color: white;
          border: none;
          padding: 8px 15px;
          border-radius: 4px;
          cursor: pointer;
          margin-right: 10px;
        }
        
        button:hover {
          background: #2980b9;
        }
        
        button:disabled {
          background: #bdc3c7;
          cursor: not-allowed;
        }
        
        .message {
          padding: 10px;
          margin: 15px 0;
          border-radius: 4px;
          background: #f8f9fa;
          border-left: 4px solid #3498db;
        }
        
        .pdf-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px;
          border-bottom: 1px solid #eee;
        }
        
        .setup-instructions {
          background: #f7f9fc;
          padding: 20px;
          border-radius: 8px;
          margin-top: 30px;
        }
      `}</style>
    </div>
  );
}

export default CloudinaryPdfApp;