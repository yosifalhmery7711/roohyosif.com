import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = firebaseConfig.firestoreDatabaseId 
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);
export const auth = getAuth(app);

// Connectivity check
async function testConnection() {
  if (!firebaseConfig.projectId || firebaseConfig.projectId.includes('remixed') || firebaseConfig.apiKey?.includes('remixed')) {
    console.warn("⚠️ Firebase is currently in placeholder mode. Please set up a live Firebase project in AI Studio to activate cloud syncing.");
    return;
  }
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log("Firebase connected successfully");
  } catch (error: any) {
    if (error.message?.includes('offline')) {
      console.error("Firebase is offline. Check configuration.");
    }
  }
}
testConnection();
