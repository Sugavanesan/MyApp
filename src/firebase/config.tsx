import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBTtWhQeozJVpYnL885FlUAJ3O8V6TJ0KI",
    authDomain: "mynewapp-f2713.firebaseapp.com",
    projectId: "mynewapp-f2713",
    storageBucket: "mynewapp-f2713.firebasestorage.app",
    messagingSenderId: "612036202025",
    appId: "1:612036202025:android:d16a3ec0a903afdec55638",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
