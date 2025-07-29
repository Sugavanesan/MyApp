import storage from '@react-native-firebase/storage';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyBTtWhQeozJVpYnL885FlUAJ3O8V6TJ0KI",
    authDomain: "mynewapp-f2713.firebaseapp.com",
    projectId: "mynewapp-f2713",
    storageBucket: "mynewapp-f2713.appspot.com",
    messagingSenderId: "612036202025",
    appId: "1:612036202025:android:d16a3ec0a903afdec55638",
};

const app = initializeApp(firebaseConfig);
export const fbstorage = storage(app);
