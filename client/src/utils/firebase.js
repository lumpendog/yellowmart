import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import firebaseConfig from '../firebaseConfig.json';

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
