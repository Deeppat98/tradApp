import { View, Text  , Button } from 'react-native'
import React, { useEffect , useState } from 'react'
import initializeFirebase from '../config/firebase.js'
import { getFirestore ,onSnapshot , doc, getDoc,  getDocs } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, query, where } from "firebase/firestore";
const Publications = () => {
  const app = initializeFirebase();
  const db = getFirestore(); 
  
  const [email , setEmail] = useState([]) ; 
  const [mila , setMila] = useState(false);
//   var query = db.collection("posts").where("name", "==", "Foo");
// var querySnapshot = await query.get();
// Now querySnapshot will be an array of documents that matched your query.
  // const id = "P5Pi8RyxvnsPm8s7BjRO" ; 
  const getPublications = async (email , password , uid) => {
    // import { collection, getDocs } from "firebase/firestore";
    const userRef = collection(db , 'users') ;
    const q = query(userRef , where("emailId" , "==" , email))  
    onSnapshot(q , (snapshot) => {
      let users = [] ;
      snapshot.docs.forEach((doc) => {
        users.push({...doc.data()  , id : doc.id})
      })
      console.log(users) ; 
    })

    // const querySnapshot = await getDocs(collection(db, "users"));
    // a.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data());
    // });
    // const docRef = doc(db, "users",  id);
    // const docSnap = await getDoc(docRef);
    // if (docSnap.exists()) {
    //   console.log("Document data:", docSnap.data());
    // } else {
    //   // docSnap.data() will be undefined in this case
    //   console.log("No such document!");
    // }
    // const q = query(collection(db, "users"), where("emailId", "==", email));
    // console.log(q.size);
    // console.log(q);
    // Create a reference to the cities collection
    /* For Reference 
          import { collection, query, where } from "firebase/firestore";
          const citiesRef = collection(db, "cities");
          // Create a query against the collection.
          const q = query(citiesRef, where("state", "==", "CA"));   
    */  
    // const usersRef = collection(db, "users");
    // const q = query(usersRef, where("emailId", "==", email));   
    // // console.log(q);
    // const querySnapshot = await getDocs(q);
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data().uid);
    // });
    // console.log(querySnapshot);
    // setEmail(querySnapshot) ; 
    setMila(true);
  }


  const getData = async () => {
    try {
      const uid = await AsyncStorage.getItem('uid');
      const email = await AsyncStorage.getItem('email');
      const password = await AsyncStorage.getItem('password');
      // if (email && password && uid) {
        console.log("getdata ke andar aa gaye hain");
          getPublications(email , password , uid); 
      // }
    } catch (e) {
      // error reading value
      console.log("error");
    }
  };

  useEffect(() => {
    console.log("useeffect ke andar aa gaye hain")
    getData() ; 
  }, [])
  return (
    <View>
      <Text>Publications helo sdfgsd sda</Text>
      <Button title = "Button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    </Button>
      <Button title = "Button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    </Button>

    <Text>{mila}</Text>
    </View>
  )
}

export default Publications