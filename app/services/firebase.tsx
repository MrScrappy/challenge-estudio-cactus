import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyC_JwpXS4uj9sRRDrbFAtalE1QulNTmKnw',
    authDomain: 'visualizer-new-devs-test.firebaseapp.com',
    projectId: 'visualizer-new-devs-test',
    storageBucket: 'visualizer-new-devs-test.appspot.com',
    messagingSenderId: '702664185241',
    appId: '1:702664185241:web:580752c50d570d0c89ef08'
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);