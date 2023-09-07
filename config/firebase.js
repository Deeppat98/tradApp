import { initializeApp } from "firebase/app";
import { getFirestore, collection ,doc, getDoc, getDocs } from "firebase/firestore";


export default function initializeFirebase(){


const firebaseConfig = {
    apiKey: "AIzaSyCPPsIlSr9d2JzOa55ctuHVqMYBmtv0ZB0",
    authDomain: "baps-translation.firebaseapp.com",
    projectId: "baps-translation",
    storageBucket: "baps-translation.appspot.com",
    messagingSenderId: "269187257441",
    appId: "1:269187257441:web:156e88cf69cac13aaf4620"
  };
   const app = initializeApp(firebaseConfig);
   
   return app ;  

}