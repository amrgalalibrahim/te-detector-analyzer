import React, { useState } from 'react';

function FunctionalAnalysis() {
  const [goResults, setGoResults] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStatus, setAnalysisStatus] = useState('');
  const [selectedGenes, setSelectedGenes] = useState('');

  const runGOEnrichment = async () => {
    if (!selectedGenes.trim()) {
      setAnalysisStatus('Please enter gene IDs');
      return;
    }

    try {
      setIsAnalyzing(true);
      setAnalysisStatus('Running GO enrichment analysis...');

      const geneList = selectedGenes.split('\n').map(gene => gene.trim()).filter(gene => gene);

      const response = await fetch('/api/go_enrichment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gene_list: geneList })
      });

      const result = await response.json();

      if (response.ok) {
        setGoResults(result.go_results);
        setAnalysisStatus('GO enrichment analysis completed successfully!');
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
      <h1 className="text-3xl font-bold mb-6">Functional Analysis</h1>
      <p className="mb-6 text-gray-600">
        Perform Gene Ontology (GO) enrichment analysis on genes associated with transposable elements.
      </p>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">GO Enrichment Analysis</h2>
        <p className="mb-4 text-gray-600">
          Enter gene IDs (one per line) to analyze their functional enrichment:
        </p>

        <textarea
          value={selectedGenes}
          onChange={(e) => setSelectedGenes(e.target.value)}
          placeholder="Enter gene IDs, one per line:\nGENE001\nGENE002\nGENE003"
          className="w-full h-32 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />

        <button 
          onClick={runGOEnrichment}
          disabled={isAnalyzing || !selectedGenes.trim()}
          className="bg-orange-600 text-white px-6 py-3 rounded-lg shadow hover:bg-orange-700 disabled:bg-gray-400"
        >
          {isAnalyzing ? 'Analyzing...' : 'Run GO Enrichment'}
        </button>

        {analysisStatus && (
          <div className={`mt-4 p-4 rounded-lg ${analysisStatus.includes('successfully') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {analysisStatus}
          </div>
        )}
      </div>

      {goResults && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">GO Enrichment Results</h2>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Enriched GO Terms</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-2 text-left">GO Term</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">P-value</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Category</th>
                  </tr>
                </thead>
                <tbody>
                  {goResults.map((term, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="border border-gray-300 px-4 py-2 font-mono text-sm">
                        {term.term}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {term.description || 'Biological Process'}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <span className={`px-2 py-1 rounded text-sm ${term.pvalue < 0.05 ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
                          {term.pvalue}
                        </span>
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                          {term.category || 'BP'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Visualization</h3>
            <div className="bg-gray-100 p-8 rounded-lg text-center">
              <p className="text-gray-500">GO enrichment bar chart will appear here</p>
              <p className="text-sm text-gray-400 mt-2">
                (Integration with Plotly.js for interactive charts)
              </p>
            </div>
          </div>

          <div className="space-x-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Download Results
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Export Chart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FunctionalAnalysis;
