import { View, Text } from 'react-native'
import { useRoute } from "@react-navigation/native"
import React , {useEffect , useState} from 'react'
import initializeFirebase from '../config/firebase.js'
import {getFirestore} from 'firebase/firestore'
import { collection, query, where , orderBy , onSnapshot } from "firebase/firestore";

const BookRenderingPage = () => {
    const route = useRoute() ; 
    const app = initializeFirebase() ; 
    const db = getFirestore(); 
    const [bookName , setBookName] = useState( "" ) ; 

    useEffect(() => {
        const name = route.params?.book ; 
        setBookName(name);
        getBookDataFunction(name); 
    } , [])

    const getBookDataFunction = (name) => {
        const userRef = collection(db , name) ;
        // const q = query(userRef , where("emailId" , "==" , email) , orderBy("chapter" ) , orderBy('para')) ;
        const q = query(userRef , orderBy("chapter" ) , orderBy('para')) ;
        onSnapshot(q , (snapshot) => {
          let users = [] ;
          snapshot.docs.forEach((doc) => {
            users.push({...doc.data()  , id : doc.id})
          })

          console.log(users);
        })
    }


  return (
    <View>
      <Text>Hello Friends !! {bookName}</Text>
    </View>
  )
}

export default BookRenderingPage