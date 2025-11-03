#!/bin/bash
# Start script for LegalKlarity backend on Railway

# Install dependencies
npm install

# Build TypeScript
npm run build

# Start the server
npm start