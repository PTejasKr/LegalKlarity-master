// Test script to verify Firebase connection
import admin from './src/db/firebase';
import { db } from './src/db/firebase';

async function testFirebaseConnection() {
  try {
    if (db) {
      // Try to access Firestore
      const testDoc = await db.collection('test').limit(1).get();
      console.log('✅ Firebase connection test successful');
      console.log(`Found ${testDoc.size} documents in test collection`);
    } else {
      console.log('⚠️ Firebase not initialized, running in mock mode');
    }
  } catch (error) {
    console.error('❌ Firebase connection test failed:', error);
  }
}

testFirebaseConnection();