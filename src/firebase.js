import { initializeApp } from 'firebase/app';

// firebaseの認証情報
const firebaseConfig = {
    apiKey: "AIzaSyCSrn4ZcMbqyM7HNjEN5Pq9JISjuRMcTeU",
    authDomain: "sample-long.firebaseapp.com",
    projectId: "sample-long",
    storageBucket: "sample-long.appspot.com",
    messagingSenderId: "346638473803",
    appId: "1:346638473803:web:9a0a223f6086020e98cbce",
  };

// firebaseを初期化する
export const app = initializeApp(firebaseConfig);