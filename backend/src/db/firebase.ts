import dotenv from 'dotenv';
import admin from 'firebase-admin';
import path from 'path';
import fs from 'fs';
dotenv.config();

let serviceAccount;
let serviceAccountPath;

try {
    // First, check if we have a service account key as an environment variable (Railway preferred method)
    if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
        console.log("🔍 Using Firebase service account key from environment variable");
        try {
            serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
            console.log("✅ Service Account loaded from environment variable");
        } catch (error: any) {
            console.log("⚠️  Error parsing FIREBASE_SERVICE_ACCOUNT_KEY:", error.message);
        }
    }
    
    // If no environment variable, check for service account key file
    if (!serviceAccount) {
        // Use service account key file instead of environment variable
        // Check multiple possible locations for the service account key file
        const possiblePaths = [
            path.join(__dirname, 'serviceAccountKey.json'), // In dist directory after build
            path.join(__dirname, '..', 'src', 'db', 'serviceAccountKey.json'), // In src directory during development
            path.join(process.cwd(), 'backend', 'src', 'db', 'serviceAccountKey.json'), // Railway deployment path
            path.join(process.cwd(), 'src', 'db', 'serviceAccountKey.json'), // Alternative path
            path.join(process.cwd(), 'backend', 'dist', 'db', 'serviceAccountKey.json'), // Railway dist path
            'src/db/serviceAccountKey.json', // Relative path
            'dist/db/serviceAccountKey.json', // Relative dist path
        ];
        
        console.log("🔍 Checking for service account key file in possible paths:", possiblePaths);
        
        for (const possiblePath of possiblePaths) {
            try {
                console.log(`🔍 Checking path: ${possiblePath}`);
                // Check if file exists
                if (fs.existsSync(possiblePath)) {
                    serviceAccount = require(possiblePath);
                    serviceAccountPath = possiblePath;
                    console.log("✅ Service Account loaded from file:", serviceAccountPath);
                    break;
                } else {
                    console.log(`⚠️  File not found at path: ${possiblePath}`);
                }
            } catch (error: any) {
                console.log(`⚠️  Error loading from path ${possiblePath}:`, error.message);
                // Continue to next path
            }
        }
    }
    
    if (!serviceAccount) {
        // Try to read the current directory to see what files are available
        try {
            const currentDir = __dirname;
            console.log("🔍 Current directory contents:", fs.readdirSync(currentDir));
        } catch (error: any) {
            console.log("⚠️  Error reading current directory:", error.message);
        }
        
        throw new Error("Service account key not found in environment variable or any expected file location");
    }
} catch (error: any) {
    console.log("⚠️  Service account key not found, running in mock mode");
    console.error("Service account error:", error.message);
}

// Initialize Firebase Admin SDK with default credentials for development
if (serviceAccount && !admin.apps.length) {
    try {
        const connected = admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });

        if (connected) {
            console.log(`✅ Firebase connected successfully`);
        } else {
            console.error(`❌ Failed to connect to Firebase`);
            throw new Error("Failed to initialize Firebase");
        }
    } catch (error: any) {
        console.log("⚠️  Firebase connection failed, running in mock mode");
        console.error("Firebase connection error:", error.message);
        // In development, we can continue without Firebase
    }
} else if (!admin.apps.length) {
    console.log("⚠️  No service account provided, running in mock mode");
    // Initialize with mock credentials for development
    // This allows the app to start without a real Firebase connection
}


export const db = admin.apps.length > 0 ? admin.firestore() : null;
export const auth = admin.apps.length > 0 ? admin.auth() : null;

export default admin;
