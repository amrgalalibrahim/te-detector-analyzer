import React, { useState, useEffect } from 'react';

function TEAnalysis() {
  const [teData, setTeData] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStatus, setAnalysisStatus] = useState('');

  const runRepeatMasker = async () => {
    try {
      setIsAnalyzing(true);
      setAnalysisStatus('Running RepeatMasker analysis...');

      const response = await fetch('/api/run_repeatmasker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ species: 'human' })
      });

      const result = await response.json();

      if (response.ok) {
        setTeData(result.te_summary);
        setAnalysisStatus('RepeatMasker analysis completed successfully!');
      } else {
        setAnalysisStatus('Analysis failed: ' + result.message);
      }
    } catch (error) {
      setAnalysisStatus('Analysis failed: ' + error.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Transposable Element Analysis</h1>
      <p className="mb-6 text-gray-600">
        Detect and analyze transposable elements using RepeatMasker.
      </p>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">RepeatMasker Analysis</h2>
        <p className="mb-4 text-gray-600">
          Run RepeatMasker to identify repetitive sequences and transposable elements in your uploaded genomes.
        </p>

        <button 
          onClick={runRepeatMasker}
          disabled={isAnalyzing}
          className="bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 disabled:bg-gray-400"
        >
          {isAnalyzing ? 'Analyzing...' : 'Run RepeatMasker'}
        </button>

        {analysisStatus && (
          <div className={`mt-4 p-4 rounded-lg ${analysisStatus.includes('successfully') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {analysisStatus}
          </div>
        )}
      </div>

      {teData && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800">Total TEs</h3>
              <p className="text-2xl font-bold text-blue-600">{teData.total_tes}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800">TE Families</h3>
              <p className="text-2xl font-bold text-green-600">{teData.te_families?.length || 0}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-800">Coverage</h3>
              <p className="text-2xl font-bold text-purple-600">{teData.coverage}%</p>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">TE Families Detected</h3>
            <div className="flex flex-wrap gap-2">
              {teData.te_families?.map((family, index) => (
                <span key={index} className="bg-gray-200 px-3 py-1 rounded-full text-sm">
                  {family}
                </span>
              ))}
            </div>
          </div>

          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Download Results
          </button>
        </div>
      )}
    </div>
  );
}

export default TEAnalysis;
