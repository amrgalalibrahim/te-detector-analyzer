import React, { useState } from 'react';

function ExpressionAnalysis() {
  const [expressionData, setExpressionData] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStatus, setAnalysisStatus] = useState('');

  const runExpressionAnalysis = async () => {
    try {
      setIsAnalyzing(true);
      setAnalysisStatus('Running gene expression analysis...');

      const response = await fetch('/api/analyze_expression', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });

      const result = await response.json();

      if (response.ok) {
        setExpressionData(result);
        setAnalysisStatus('Expression analysis completed successfully!');
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
      <h1 className="text-3xl font-bold mb-6">Gene Expression Analysis</h1>
      <p className="mb-6 text-gray-600">
        Analyze gene expression using Salmon quantification and DESeq2 differential expression.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Salmon Quantification</h2>
          <p className="mb-4 text-gray-600">
            Quantify transcript abundance from RNA-seq data.
          </p>
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-sm text-gray-600">Status: Ready to run</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">DESeq2 Analysis</h2>
          <p className="mb-4 text-gray-600">
            Perform differential expression analysis.
          </p>
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-sm text-gray-600">Status: Waiting for quantification</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Run Analysis</h2>

        <button 
          onClick={runExpressionAnalysis}
          disabled={isAnalyzing}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg shadow hover:bg-purple-700 disabled:bg-gray-400"
        >
          {isAnalyzing ? 'Analyzing...' : 'Run Expression Analysis'}
        </button>

        {analysisStatus && (
          <div className={`mt-4 p-4 rounded-lg ${analysisStatus.includes('successfully') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {analysisStatus}
          </div>
        )}
      </div>

      {expressionData && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Expression Results</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800">Differential Genes</h3>
              <p className="text-2xl font-bold text-blue-600">{expressionData.deseq2_results?.differential_genes || 0}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800">Analysis Status</h3>
              <p className="text-lg font-bold text-green-600">Complete</p>
            </div>
          </div>

          <div className="space-y-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2">
              View Volcano Plot
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mr-2">
              View Heatmap
            </button>
            <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
              Download Results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExpressionAnalysis;
