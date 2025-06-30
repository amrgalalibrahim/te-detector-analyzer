#!/usr/bin/env Rscript

# DESeq2 Analysis Script for TE Detector
library(DESeq2)
library(ggplot2)
library(pheatmap)

args <- commandArgs(trailingOnly = TRUE)
if (length(args) != 3) {
  stop("Usage: Rscript run_deseq2.R <counts_matrix> <sample_info> <output_file>")
}

counts_file <- args[1]
sample_info_file <- args[2]
output_file <- args[3]

# Read data
counts <- read.csv(counts_file, row.names = 1)
sample_info <- read.csv(sample_info_file, row.names = 1)

# Create DESeq2 object
dds <- DESeqDataSetFromMatrix(countData = counts,
                              colData = sample_info,
                              design = ~ condition)

# Run DESeq2
dds <- DESeq(dds)
res <- results(dds)

# Save results
write.csv(as.data.frame(res), output_file)

# Generate plots
pdf(paste0(output_file, "_plots.pdf"))
plotMA(res)
plotPCA(vst(dds), intgroup = "condition")
dev.off()

cat("DESeq2 analysis complete. Results saved to", output_file, "\n")
