import React, { useState } from 'react';

function StructurePrediction() {
  const [sequence, setSequence] = useState('');
  const [structureData, setStructureData] = useState(null);
  const [isPredicting, setIsPredicting] = useState(false);
  const [predictionStatus, setPredictionStatus] = useState('');

  const predictStructure = async () => {
    if (!sequence.trim()) {
      setPredictionStatus('Please enter a sequence');
      return;
    }

    try {
      setIsPredicting(true);
      setPredictionStatus('Predicting structure using ViennaRNA...');

      const response = await fetch('/api/predict_structure', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sequence: sequence.trim() })
      });

      const result = await response.json();

      if (response.ok) {
        setStructureData(result.structure);
        setPredictionStatus('Structure prediction completed successfully!');
      } else {
        setPredictionStatus('Prediction failed: ' + result.message);
      }
    } catch (error) {
      setPredictionStatus('Prediction failed: ' + error.message);
    } finally {
      setIsPredicting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">TE Structure Prediction</h1>
      <p className="mb-6 text-gray-600">
        Predict 2D and 3D structures of transposable element sequences using ViennaRNA.
      </p>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Input Sequence</h2>
        <p className="mb-4 text-gray-600">
          Enter the TE sequence for structure prediction (RNA or DNA):
        </p>

        <textarea
          value={sequence}
          onChange={(e) => setSequence(e.target.value)}
          placeholder="Enter your sequence here (e.g., AUGCGAUCGAUCGAUC...)"
          className="w-full h-32 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="mt-4 flex items-center space-x-4">
          <button 
            onClick={predictStructure}
            disabled={isPredicting || !sequence.trim()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 disabled:bg-gray-400"
          >
            {isPredicting ? 'Predicting...' : 'Predict Structure'}
          </button>

          <button 
            onClick={() => setSequence('')}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Clear
          </button>
        </div>

        {predictionStatus && (
          <div className={`mt-4 p-4 rounded-lg ${predictionStatus.includes('successfully') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {predictionStatus}
          </div>
        )}
      </div>

      {structureData && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Structure Prediction Results</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">2D Structure</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-mono text-sm break-all">
                  {structureData.structure || 'Structure visualization will appear here'}
                </p>
              </div>

              <div className="mt-4">
                <h4 className="font-semibold">Free Energy</h4>
                <p className="text-lg text-blue-600 font-bold">
                  {structureData.energy ? `${structureData.energy} kcal/mol` : 'Calculating...'}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">3D Visualization</h3>
              <div className="bg-gray-100 p-8 rounded-lg text-center">
                <p className="text-gray-500">3D structure viewer will be integrated here</p>
                <p className="text-sm text-gray-400 mt-2">
                  (Integration with molecular viewers like 3Dmol.js)
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 space-x-4">
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Download Structure
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Export Image
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default StructurePrediction;
