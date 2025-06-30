import React, { useState } from 'react';

function UploadData() {
  const [files, setFiles] = useState({
    hostGenome: null,
    parasiteGenome: null,
    hostTranscriptome: null,
    parasiteTranscriptome: null
  });
  const [uploadStatus, setUploadStatus] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (fileType, file) => {
    setFiles(prev => ({ ...prev, [fileType]: file }));
  };

  const handleUpload = async () => {
    const formData = new FormData();
    Object.keys(files).forEach(key => {
      if (files[key]) formData.append(key, files[key]);
    });

    try {
      setIsUploading(true);
      setUploadStatus('Uploading files...');

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (response.ok) {
        setUploadStatus('Upload successful! Files are being processed.');
      } else {
        setUploadStatus('Upload failed: ' + result.message);
      }
    } catch (error) {
      setUploadStatus('Upload failed: ' + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Upload Data</h1>
      <p className="mb-6 text-gray-600">
        Upload your genome and transcriptome files to begin the analysis.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-blue-600">Host Genome</h3>
          <p className="text-sm text-gray-500 mb-3">Accepted formats: .fasta, .fa, .gff, .gtf</p>
          <input 
            type="file" 
            accept=".fasta,.fa,.gff,.gtf"
            onChange={(e) => handleFileChange('hostGenome', e.target.files[0])}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {files.hostGenome && (
            <p className="text-sm text-green-600 mt-2">✓ {files.hostGenome.name}</p>
          )}
        </div>

        <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-green-600">Parasite Genome</h3>
          <p className="text-sm text-gray-500 mb-3">Accepted formats: .fasta, .fa, .gff, .gtf</p>
          <input 
            type="file" 
            accept=".fasta,.fa,.gff,.gtf"
            onChange={(e) => handleFileChange('parasiteGenome', e.target.files[0])}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {files.parasiteGenome && (
            <p className="text-sm text-green-600 mt-2">✓ {files.parasiteGenome.name}</p>
          )}
        </div>

        <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-purple-600">Host Transcriptome</h3>
          <p className="text-sm text-gray-500 mb-3">Accepted formats: .fastq, .fq, .csv, .tsv</p>
          <input 
            type="file" 
            accept=".fastq,.fq,.csv,.tsv"
            onChange={(e) => handleFileChange('hostTranscriptome', e.target.files[0])}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {files.hostTranscriptome && (
            <p className="text-sm text-green-600 mt-2">✓ {files.hostTranscriptome.name}</p>
          )}
        </div>

        <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-red-600">Parasite Transcriptome</h3>
          <p className="text-sm text-gray-500 mb-3">Accepted formats: .fastq, .fq, .csv, .tsv</p>
          <input 
            type="file" 
            accept=".fastq,.fq,.csv,.tsv"
            onChange={(e) => handleFileChange('parasiteTranscriptome', e.target.files[0])}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          {files.parasiteTranscriptome && (
            <p className="text-sm text-green-600 mt-2">✓ {files.parasiteTranscriptome.name}</p>
          )}
        </div>
      </div>

      <div className="text-center">
        <button 
          onClick={handleUpload}
          disabled={isUploading || Object.values(files).every(file => !file)}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isUploading ? 'Uploading...' : 'Upload Files'}
        </button>
      </div>

      {uploadStatus && (
        <div className={`mt-6 p-4 rounded-lg ${uploadStatus.includes('successful') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {uploadStatus}
        </div>
      )}
    </div>
  );
}

export default UploadData;
