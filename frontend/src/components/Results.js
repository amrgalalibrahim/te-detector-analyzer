import React, { useState, useEffect } from 'react';

function Results() {
  const [results, setResults] = useState({
    teAnalysis: null,
    expression: null,
    structure: null,
    functional: null
  });
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Load results from localStorage or API
    const savedResults = localStorage.getItem('teAnalysisResults');
    if (savedResults) {
      setResults(JSON.parse(savedResults));
    }
  }, []);

  const downloadReport = (format) => {
    // Implementation for downloading reports
    console.log(`Downloading report in ${format} format`);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'te-results', label: 'TE Analysis', icon: '🧬' },
    { id: 'expression', label: 'Expression', icon: '📈' },
    { id: 'structure', label: 'Structure', icon: '🔬' },
    { id: 'functional', label: 'Functional', icon: '⚙️' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Analysis Results</h1>
      <p className="mb-6 text-gray-600">
        View and download your transposable element analysis results.
      </p>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow">
        {activeTab === 'overview' && (
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Analysis Overview</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800">Total TEs</h3>
                <p className="text-2xl font-bold text-blue-600">1,247</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800">Differential Genes</h3>
                <p className="text-2xl font-bold text-green-600">523</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-800">GO Terms</h3>
                <p className="text-2xl font-bold text-purple-600">89</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="font-semibold text-orange-800">Structures</h3>
                <p className="text-2xl font-bold text-orange-600">15</p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Analysis Summary</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                    TE Detection: Completed
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                    Expression Analysis: Completed
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                    Structure Prediction: Completed
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                    Functional Analysis: Completed
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'te-results' && (
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">TE Analysis Results</h2>
            <div className="bg-gray-100 p-8 rounded-lg text-center">
              <p className="text-gray-500">TE analysis visualization will appear here</p>
              <p className="text-sm text-gray-400 mt-2">
                (Charts showing TE distribution, families, coverage, etc.)
              </p>
            </div>
          </div>
        )}

        {activeTab === 'expression' && (
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Expression Analysis Results</h2>
            <div className="bg-gray-100 p-8 rounded-lg text-center">
              <p className="text-gray-500">Expression analysis plots will appear here</p>
              <p className="text-sm text-gray-400 mt-2">
                (Volcano plots, heatmaps, PCA plots, etc.)
              </p>
            </div>
          </div>
        )}

        {activeTab === 'structure' && (
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Structure Prediction Results</h2>
            <div className="bg-gray-100 p-8 rounded-lg text-center">
              <p className="text-gray-500">Structure visualizations will appear here</p>
              <p className="text-sm text-gray-400 mt-2">
                (2D and 3D structure viewers)
              </p>
            </div>
          </div>
        )}

        {activeTab === 'functional' && (
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Functional Analysis Results</h2>
            <div className="bg-gray-100 p-8 rounded-lg text-center">
              <p className="text-gray-500">GO enrichment charts will appear here</p>
              <p className="text-sm text-gray-400 mt-2">
                (Bar charts, network diagrams, pathway maps, etc.)
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Download Section */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Download Results</h2>
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={() => downloadReport('pdf')}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            📄 Download PDF Report
          </button>
          <button 
            onClick={() => downloadReport('excel')}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            📊 Download Excel Data
          </button>
          <button 
            onClick={() => downloadReport('csv')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            📋 Download CSV Files
          </button>
          <button 
            onClick={() => downloadReport('images')}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            🖼️ Download Images
          </button>
        </div>
      </div>
    </div>
  );
}

export default Results;
