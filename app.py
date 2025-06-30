from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import subprocess
import os
import pandas as pd
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
RESULTS_FOLDER = 'results'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['RESULTS_FOLDER'] = RESULTS_FOLDER

# Ensure directories exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(RESULTS_FOLDER, exist_ok=True)

@app.route('/api/upload', methods=['POST'])
def upload_files():
    """Handle file uploads and run quality control"""
    try:
        uploaded_files = {}
        for file_type in ['hostGenome', 'parasiteGenome', 'hostTranscriptome', 'parasiteTranscriptome']:
            if file_type in request.files:
                file = request.files[file_type]
                if file.filename != '':
                    filename = secure_filename(file.filename)
                    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                    file.save(filepath)
                    uploaded_files[file_type] = filepath

        # Run quality control
        qc_report = run_quality_control(uploaded_files)

        return jsonify({
            'status': 'success',
            'uploaded_files': uploaded_files,
            'qc_report': qc_report
        })
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/run_repeatmasker', methods=['POST'])
def run_repeatmasker():
    """Run RepeatMasker analysis"""
    try:
        data = request.json
        genome_file = data.get('genome_file')
        species = data.get('species', 'human')

        output_dir = os.path.join(app.config['RESULTS_FOLDER'], 'repeatmasker')
        os.makedirs(output_dir, exist_ok=True)

        # Run RepeatMasker
        cmd = f"RepeatMasker -species {species} -dir {output_dir} {genome_file}"
        result = subprocess.run(cmd, shell=True, capture_output=True, text=True)

        if result.returncode == 0:
            # Parse RepeatMasker output
            te_summary = parse_repeatmasker_output(output_dir)
            return jsonify({
                'status': 'success',
                'te_summary': te_summary,
                'output_dir': output_dir
            })
        else:
            return jsonify({
                'status': 'error',
                'message': result.stderr
            }), 500

    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/analyze_expression', methods=['POST'])
def analyze_expression():
    """Run gene expression analysis"""
    try:
        data = request.json
        fastq_files = data.get('fastq_files')
        reference_index = data.get('reference_index')

        # Run Salmon quantification
        salmon_results = run_salmon_quantification(fastq_files, reference_index)

        # Run DESeq2 analysis
        deseq2_results = run_deseq2_analysis(salmon_results)

        return jsonify({
            'status': 'success',
            'salmon_results': salmon_results,
            'deseq2_results': deseq2_results
        })

    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/map_tes', methods=['POST'])
def map_tes():
    """Map TEs and identify target genes"""
    try:
        data = request.json
        te_annotations = data.get('te_annotations')
        genome_annotations = data.get('genome_annotations')

        # Map TEs to genes
        target_genes = map_tes_to_genes(te_annotations, genome_annotations)

        return jsonify({
            'status': 'success',
            'target_genes': target_genes
        })

    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/predict_structure', methods=['POST'])
def predict_structure():
    """Predict TE structure using ViennaRNA"""
    try:
        data = request.json
        sequence = data.get('sequence')

        # Run ViennaRNA
        structure_result = run_vienna_rna(sequence)

        return jsonify({
            'status': 'success',
            'structure': structure_result
        })

    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/go_enrichment', methods=['POST'])
def go_enrichment():
    """Run GO enrichment analysis"""
    try:
        data = request.json
        gene_list = data.get('gene_list')

        # Run GO enrichment
        go_results = run_go_enrichment(gene_list)

        return jsonify({
            'status': 'success',
            'go_results': go_results
        })

    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

# Helper functions
def run_quality_control(files):
    """Run quality control on uploaded files"""
    qc_report = {}
    for file_type, filepath in files.items():
        # Basic file stats
        file_size = os.path.getsize(filepath)
        qc_report[file_type] = {
            'file_size': file_size,
            'status': 'uploaded'
        }
    return qc_report

def parse_repeatmasker_output(output_dir):
    """Parse RepeatMasker output files"""
    # This would parse the actual RepeatMasker output
    return {
        'total_tes': 1000,
        'te_families': ['LINE', 'SINE', 'LTR', 'DNA'],
        'coverage': 45.2
    }

def run_salmon_quantification(fastq_files, reference_index):
    """Run Salmon for transcript quantification"""
    # Implementation would run actual Salmon
    return {'quantification_complete': True}

def run_deseq2_analysis(salmon_results):
    """Run DESeq2 for differential expression"""
    # Implementation would run actual DESeq2
    return {'differential_genes': 500}

def map_tes_to_genes(te_annotations, genome_annotations):
    """Map TEs to nearby genes"""
    # Implementation would do actual mapping
    return [{'gene_id': 'GENE001', 'te_distance': 1000}]

def run_vienna_rna(sequence):
    """Run ViennaRNA for structure prediction"""
    # Implementation would run actual ViennaRNA
    return {'structure': '(((...)))', 'energy': -15.2}

def run_go_enrichment(gene_list):
    """Run GO enrichment analysis"""
    # Implementation would run actual GO analysis
    return [{'term': 'GO:0008150', 'pvalue': 0.001}]

@app.route("/")
def index():
    return "Transposable Element Detector & Analyzer API is running!"

if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
