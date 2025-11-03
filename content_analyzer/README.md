# LegalKlarity Content Analyzer

A Python microservice for analyzing legal documents using AI.

## Features

- PDF, DOCX, and image document processing
- Legal document classification
- Comprehensive document analysis with 12 categories:
  - Summary
  - Key Terms
  - Main Clauses
  - Critical Dates
  - Parties
  - Jurisdiction
  - Obligations
  - Risks
  - Recommendations
  - Missing Clauses
  - Compliance Issues
  - Next Steps

## Deployment to Railway

### Prerequisites

1. A Railway.app account
2. A Google Cloud Platform account with Vertex AI API enabled
3. A Google Cloud service account with appropriate permissions

### Deployment Steps

1. Create a new Railway project
2. Deploy from the `content_analyzer` directory in the LegalKlarity repository
3. Railway will automatically detect the `railway.json` configuration file

### Environment Variables

In the Railway dashboard, go to your project settings and add these environment variables:

```
# Required for Google Cloud Vertex AI
GOOGLE_CLOUD_PROJECT=your-google-cloud-project-id
GOOGLE_CLOUD_LOCATION=us-central1

# Optional (for authentication with Google Cloud)
GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account-key.json
```

### Google Cloud Setup

1. Create a Google Cloud Project
2. Enable the Vertex AI API
3. Create a service account with the following roles:
   - Vertex AI User
   - Storage Object Viewer (if using Cloud Storage)
4. Download the service account key as a JSON file
5. Add the service account key to Railway as a secret file or environment variable

### Fallback Mode

If Google Cloud credentials are not provided, the service will operate in fallback mode with basic document analysis capabilities.

## Local Development

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Set environment variables:
   ```bash
   export GOOGLE_CLOUD_PROJECT=your-project-id
   export GOOGLE_CLOUD_LOCATION=us-central1
   ```

3. Run the application:
   ```bash
   python app.py
   ```

The service will be available at `http://localhost:8000`.

## API Endpoints

- `POST /enhanced_analysis` - Upload and analyze a legal document
- `POST /export/pdf` - Export analysis results to PDF
- `POST /export/docx` - Export analysis results to DOCX
- `GET /active` - Health check endpoint

## File Types Supported

- PDF (.pdf)
- Word Documents (.docx)
- Images (.png, .jpg, .jpeg)

## Integration with Backend

The backend service should set the `CONTENT_ANALYZER_URL` environment variable to point to this service's URL.

For Railway deployments, the URL will be in the format:
`https://<your-content-analyzer-service-name>.up.railway.app`