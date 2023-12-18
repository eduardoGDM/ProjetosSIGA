import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyCLd6BGo6Z9Pp0uGt5QYVMrAwbhATkeyrU",
  authDomain: "siga-software.firebaseapp.com",
  databaseURL: "https://siga-software-default-rtdb.firebaseio.com",
  projectId: "siga-software",
  storageBucket: "siga-software.appspot.com",
  messagingSenderId: "8997314242",
  appId: "1:8997314242:web:7e56efc01d37dfd407255b",
  measurementId: "G-NY2ERQ4G33"
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);

// Exporte o objeto app para que ele possa ser usado em outros componentes do aplicativo
export default app;