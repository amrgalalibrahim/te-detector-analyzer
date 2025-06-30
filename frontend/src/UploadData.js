import React, { useState } from 'react';
import axios from 'axios';

function UploadData() {
  const [files, setFiles] = useState({
    hostGenome: null,
    parasiteGenome: null,
    hostTranscriptome: null,
    parasiteTranscriptome: null
  });
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (fileType, file) => {
    setFiles(prev => ({ ...prev, [fileType]: file }));
  };

  const handleUpload = async () => {
    const formData = new FormData();
    Object.keys(files).forEach(key => {
      if (files[key]) formData.append(key, files[key]);
    });

    try {
      setUploadStatus('Uploading...');
      const response = await axios.post('/api/upload', formData);
      setUploadStatus('Upload successful!');
    } catch (error) {
      setUploadStatus('Upload failed: ' + error.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Upload Data</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border p-4 rounded">
          <h3 className="text-lg font-semibold mb-2">Host Genome</h3>
          <input 
            type="file" 
            accept=".fasta,.fa,.gff,.gtf"
            onChange={(e) => handleFileChange('hostGenome', e.target.files[0])}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="border p-4 rounded">
          <h3 className="text-lg font-semibold mb-2">Parasite Genome</h3>
          <input 
            type="file" 
            accept=".fasta,.fa,.gff,.gtf"
            onChange={(e) => handleFileChange('parasiteGenome', e.target.files[0])}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="border p-4 rounded">
          <h3 className="text-lg font-semibold mb-2">Host Transcriptome</h3>
          <input 
            type="file" 
            accept=".fastq,.fq,.csv,.tsv"
            onChange={(e) => handleFileChange('hostTranscriptome', e.target.files[0])}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="border p-4 rounded">
          <h3 className="text-lg font-semibold mb-2">Parasite Transcriptome</h3>
          <input 
            type="file" 
            accept=".fastq,.fq,.csv,.tsv"
            onChange={(e) => handleFileChange('parasiteTranscriptome', e.target.files[0])}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      <button 
        onClick={handleUpload}
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
      >
        Upload Files
      </button>

      {uploadStatus && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          {uploadStatus}
        </div>
      )}
    </div>
  );
}

export default UploadData;
