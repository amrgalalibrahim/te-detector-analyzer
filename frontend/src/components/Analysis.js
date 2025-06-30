import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Button,
  LinearProgress,
  Alert,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  PlayArrow as PlayIcon,
  CheckCircle as CheckIcon,
  Error as ErrorIcon,
  Pending as PendingIcon,
  ExpandMore as ExpandMoreIcon,
  Timeline as TimelineIcon,
  Analytics as AnalyticsIcon,
  Visibility as VisibilityIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Analysis = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [stepStatus, setStepStatus] = useState({});
  const [analysisRunning, setAnalysisRunning] = useState(false);
  const [logs, setLogs] = useState([]);

  const analysisSteps = [
    {
      label: 'Genome Annotation & Quality Control',
      description: 'Validating uploaded files and running quality control checks',
      tasks: [
        'Validating FASTA format',
        'Checking sequence integrity',
        'Generating quality metrics',
        'Creating genome annotations'
      ],
      estimatedTime: '5-10 minutes'
    },
    {
      label: 'RepeatMasker Analysis',
      description: 'Identifying repeated sequences and transposable elements',
      tasks: [
        'Running RepeatMasker on host genome',
        'Running RepeatMasker on parasite genome',
        'Classifying TE families',
        'Generating repeat annotations'
      ],
      estimatedTime: '15-30 minutes'
    },
    {
      label: 'Transcriptome Processing',
      description: 'Processing RNA-Seq data and quantifying gene expression',
      tasks: [
        'Quality control of RNA-Seq data',
        'Salmon quantification',
        'DESeq2 differential expression analysis',
        'Expression matrix generation'
      ],
      estimatedTime: '10-20 minutes'
    },
    {
      label: 'TE Mapping & Target Gene Identification',
      description: 'Mapping TEs to genomic locations and identifying target genes',
      tasks: [
        'Mapping TEs to genome coordinates',
        'Identifying genes near TEs',
        'Calculating TE-gene distances',
        'Annotating target genes'
      ],
      estimatedTime: '5-10 minutes'
    },
    {
      label: 'Structure Prediction & Functional Analysis',
      description: 'Predicting TE structures and performing functional enrichment',
      tasks: [
        'Predicting 2D/3D structures with ViennaRNA',
        'GO enrichment analysis',
        'Pathway analysis',
        'Comparative expression analysis'
      ],
      estimatedTime: '10-15 minutes'
    },
    {
      label: 'Results Generation',
      description: 'Generating visualizations and preparing downloadable reports',
      tasks: [
        'Creating interactive plots',
        'Generating genome browser tracks',
        'Preparing summary statistics',
        'Creating downloadable reports'
      ],
      estimatedTime: '5 minutes'
    }
  ];

  const startAnalysis = async () => {
    setAnalysisRunning(true);
    setActiveStep(0);
    setStepStatus({});
    setLogs([]);

    // Simulate analysis steps
    for (let i = 0; i < analysisSteps.length; i++) {
      setActiveStep(i);
      setStepStatus(prev => ({ ...prev, [i]: 'running' }));

      // Add log entries
      const step = analysisSteps[i];
      setLogs(prev => [...prev, `Starting: ${step.label}`]);

      for (let j = 0; j < step.tasks.length; j++) {
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
        setLogs(prev => [...prev, `✓ ${step.tasks[j]}`]);
      }

      setStepStatus(prev => ({ ...prev, [i]: 'completed' }));
      setLogs(prev => [...prev, `Completed: ${step.label}`]);
    }

    setAnalysisRunning(false);
    setLogs(prev => [...prev, 'Analysis completed successfully!']);
  };

  const getStepIcon = (stepIndex) => {
    const status = stepStatus[stepIndex];
    if (status === 'completed') return <CheckIcon color="success" />;
    if (status === 'running') return <CircularProgress size={24} />;
    if (status === 'error') return <ErrorIcon color="error" />;
    return <PendingIcon color="disabled" />;
  };

  const getStepStatus = (stepIndex) => {
    const status = stepStatus[stepIndex];
    if (status === 'completed') return 'finished';
    if (status === 'running') return 'active';
    if (status === 'error') return 'error';
    return 'disabled';
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Transposable Element Analysis
      </Typography>

      <Typography variant="body1" color="text.secondary" mb={4}>
        Run comprehensive analysis to detect and characterize transposable elements
        in your uploaded genomic data.
      </Typography>

      {!analysisRunning && activeStep === 0 && (
        <Alert severity="info" sx={{ mb: 3 }}>
          Ready to start analysis. The complete workflow will take approximately 45-90 minutes
          depending on file sizes and system load.
        </Alert>
      )}

      {analysisRunning && (
        <Alert severity="info" sx={{ mb: 3 }}>
          Analysis in progress... Please do not close this window.
        </Alert>
      )}

      {!analysisRunning && stepStatus[analysisSteps.length - 1] === 'completed' && (
        <Alert severity="success" sx={{ mb: 3 }} action={
          <Button color="inherit" size="small" onClick={() => navigate('/results')}>
            View Results
          </Button>
        }>
          Analysis completed successfully! Click to view results.
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Analysis Steps */}
        <Grid item xs={12} md={8}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
              <Typography variant="h5">Analysis Pipeline</Typography>
              {!analysisRunning && stepStatus[analysisSteps.length - 1] !== 'completed' && (
                <Button
                  variant="contained"
                  startIcon={<PlayIcon />}
                  onClick={startAnalysis}
                  size="large"
                >
                  Start Analysis
                </Button>
              )}
            </Box>

            <Stepper activeStep={activeStep} orientation="vertical">
              {analysisSteps.map((step, index) => (
                <Step key={index} completed={stepStatus[index] === 'completed'}>
                  <StepLabel
                    icon={getStepIcon(index)}
                    error={stepStatus[index] === 'error'}
                  >
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography variant="h6">{step.label}</Typography>
                      <Chip 
                        label={step.estimatedTime} 
                        size="small" 
                        variant="outlined" 
                      />
                    </Box>
                  </StepLabel>
                  <StepContent>
                    <Typography variant="body2" color="text.secondary" mb={2}>
                      {step.description}
                    </Typography>
                    <List dense>
                      {step.tasks.map((task, taskIndex) => (
                        <ListItem key={taskIndex} sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            {stepStatus[index] === 'completed' ? (
                              <CheckIcon color="success" fontSize="small" />
                            ) : stepStatus[index] === 'running' ? (
                              <CircularProgress size={16} />
                            ) : (
                              <PendingIcon color="disabled" fontSize="small" />
                            )}
                          </ListItemIcon>
                          <ListItemText 
                            primary={task}
                            primaryTypographyProps={{ variant: 'body2' }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </Paper>
        </Grid>

        {/* Progress Summary & Logs */}
        <Grid item xs={12} md={4}>
          {/* Progress Summary */}
          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" mb={2}>Progress Summary</Typography>
            <Box mb={2}>
              <Typography variant="body2" color="text.secondary" mb={1}>
                Overall Progress
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={(Object.values(stepStatus).filter(s => s === 'completed').length / analysisSteps.length) * 100}
                sx={{ height: 8, borderRadius: 4 }}
              />
              <Typography variant="caption" color="text.secondary">
                {Object.values(stepStatus).filter(s => s === 'completed').length} of {analysisSteps.length} steps completed
              </Typography>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Card variant="outlined">
                  <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                    <Typography variant="h4" color="success.main">
                      {Object.values(stepStatus).filter(s => s === 'completed').length}
                    </Typography>
                    <Typography variant="caption">Completed</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card variant="outlined">
                  <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                    <Typography variant="h4" color="primary.main">
                      {Object.values(stepStatus).filter(s => s === 'running').length}
                    </Typography>
                    <Typography variant="caption">Running</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>

          {/* Analysis Logs */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Analysis Logs</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box 
                sx={{ 
                  maxHeight: 300, 
                  overflow: 'auto', 
                  backgroundColor: '#f5f5f5', 
                  p: 2, 
                  borderRadius: 1,
                  fontFamily: 'monospace'
                }}
              >
                {logs.length === 0 ? (
                  <Typography variant="body2" color="text.secondary">
                    No logs yet. Start analysis to see progress.
                  </Typography>
                ) : (
                  logs.map((log, index) => (
                    <Typography 
                      key={index} 
                      variant="body2" 
                      sx={{ 
                        fontSize: '0.75rem',
                        color: log.includes('✓') ? 'success.main' : 'text.primary',
                        fontWeight: log.includes('Starting') || log.includes('Completed') ? 'bold' : 'normal'
                      }}
                    >
                      {log}
                    </Typography>
                  ))
                )}
              </Box>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Analysis;
