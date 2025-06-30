import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">TE Detector</Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-blue-200">Home</Link>
          <Link to="/upload" className="hover:text-blue-200">Upload Data</Link>
          <Link to="/te-analysis" className="hover:text-blue-200">TE Analysis</Link>
          <Link to="/expression" className="hover:text-blue-200">Expression</Link>
          <Link to="/structure" className="hover:text-blue-200">Structure</Link>
          <Link to="/functional" className="hover:text-blue-200">Functional</Link>
          <Link to="/results" className="hover:text-blue-200">Results</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
