# Challenge 5: Sales Data Processing

**Difficulty:** Medium
**Estimated Time:** 75-90 minutes
**Skills:** Data transformation, CSV/JSON processing, algorithms, aggregation

## Overview

Process and analyze sales data from CSV files. This challenge tests your ability to:
- Read and parse CSV data
- Transform and clean data
- Perform aggregations and calculations
- Generate reports in different formats
- Handle edge cases and data validation

## Getting Started

```bash
cd challenges/05-data-processing
npm install
npm run dev
```

## What You Need to Build

### Data Processing Pipeline

1. **Read** sales data from CSV files
2. **Validate** and clean the data
3. **Transform** data into useful formats
4. **Aggregate** data for reporting
5. **Export** results to JSON/CSV

### Sample Data Format

```csv
id,product,category,quantity,price,date,salesperson,region
1,Laptop,Electronics,2,999.99,2024-01-15,John Doe,North
2,Coffee Mug,Home,50,12.99,2024-01-15,Jane Smith,South
```

### Required Reports

1. **Daily Sales Summary**
   - Total sales per day
   - Number of transactions
   - Average order value

2. **Product Performance**
   - Top selling products by quantity
   - Top revenue generating products
   - Product category breakdown

3. **Salesperson Analysis**
   - Sales by person
   - Performance ranking
   - Regional breakdown

4. **Trend Analysis**
   - Month-over-month growth
   - Seasonal patterns
   - Moving averages

## Implementation Tasks

1. **Data Reader** - Parse CSV files safely
2. **Data Validator** - Check for missing/invalid data
3. **Data Transformer** - Clean and normalize data
4. **Aggregator** - Calculate summaries and metrics
5. **Report Generator** - Create formatted outputs
6. **CLI Interface** - Command-line tool for processing

## Requirements

- Handle large datasets efficiently
- Robust error handling for malformed data
- Configurable date ranges and filters
- Multiple output formats (JSON, CSV, console)
- Comprehensive test coverage

This challenge tests real-world data processing skills!