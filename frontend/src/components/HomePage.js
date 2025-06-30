import React from 'react';

function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Transposable Element Detector & Analyzer</h1>
      <p className="mb-6 text-lg">
        A powerful platform for detecting, analyzing, and visualizing transposable elements (TEs) in host and parasite genomes using transcriptomic data.
      </p>

      <div className="mb-8 bg-gray-100 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Workflow Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-bold text-blue-600">1. Upload Data</h3>
            <p className="text-sm">Host/parasite genomes and transcriptomes</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-bold text-green-600">2. TE Detection</h3>
            <p className="text-sm">RepeatMasker analysis</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-bold text-purple-600">3. Expression</h3>
            <p className="text-sm">Salmon & DESeq2 analysis</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-bold text-red-600">4. Results</h3>
            <p className="text-sm">Visualization & reports</p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
      <ul className="list-disc ml-8 mb-8 space-y-2">
        <li>Upload and preprocess genome and transcriptome data</li>
        <li>Automated TE detection with RepeatMasker</li>
        <li>Gene expression analysis (Salmon, DESeq2)</li>
        <li>TE mapping, target gene identification, and structure prediction</li>
        <li>Functional enrichment and comparative analysis</li>
        <li>Interactive visualizations and downloadable reports</li>
      </ul>

      <div className="text-center">
        <a href="/upload" className="bg-blue-600 text-white px-8 py-4 rounded-lg shadow hover:bg-blue-700 text-lg font-semibold">
          Get Started
        </a>
      </div>
    </div>
  );
}

export default HomePage;
