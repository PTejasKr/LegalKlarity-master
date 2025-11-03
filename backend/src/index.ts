import dotenv from "dotenv";
import { app } from "./app";

// Load environment variables
dotenv.config();

// Check if we're running in a Firebase environment
const isFirebaseEnv = !!process.env.FUNCTIONS_EMULATOR ||
    !!process.env.FIREBASE_CONFIG ||
    !!process.env.K_SERVICE;

if (isFirebaseEnv) {
    // Firebase Functions deployment
    const functions = require("firebase-functions");
    exports.api = functions.https.onRequest(app);
} else {
    // Standalone server deployment (for Railway, Render, etc.)
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
        console.log(`✅ Server running on http://localhost:${PORT}`);
        console.log(`✅ API available at http://localhost:${PORT}/api/v1/active`);
    });
}
