import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import UploadData from './components/UploadData';
import TEAnalysis from './components/TEAnalysis';
import ExpressionAnalysis from './components/ExpressionAnalysis';
import StructurePrediction from './components/StructurePrediction';
import FunctionalAnalysis from './components/FunctionalAnalysis';
import Results from './components/Results';
import Navigation from './components/Navigation';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/upload" element={<UploadData />} />
          <Route path="/te-analysis" element={<TEAnalysis />} />
          <Route path="/expression" element={<ExpressionAnalysis />} />
          <Route path="/structure" element={<StructurePrediction />} />
          <Route path="/functional" element={<FunctionalAnalysis />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
