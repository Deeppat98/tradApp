import { ScrollView ,StyleSheet, TouchableOpacity , View , Text } from 'react-native'
import { useRoute } from "@react-navigation/native"
import React , {useEffect , useState} from 'react'
import initializeFirebase from '../config/firebase.js'
import {getFirestore} from 'firebase/firestore'
import { collection, query, where , orderBy , onSnapshot } from "firebase/firestore";

const BookRenderingPage = ({navigation}) => {
    const route = useRoute() ; 
    const app = initializeFirebase() ; 
    const db = getFirestore(); 
    const [bookName , setBookName] = useState( "" ) ; 
    const [bookContent  , setBookContent] = useState([]) ; 

    useEffect(() => {
        const name = route.params?.book ; 
        setBookName(name);
        getBookDataFunction(name); 
    } , [])

    const handleClick = (bookName , bookContent) => {
      console.log("button clicked"); 
      // Alert.alert("  " , item);
      navigation.navigate("TranslationPage" , {bookname : bookName , bookcontent : bookContent})
  }

    const getBookDataFunction = (name) => {
        const userRef = collection(db , name) ;
        // const q = query(userRef , where("emailId" , "==" , email) , orderBy("chapter" ) , orderBy('para')) ;
        const q = query(userRef , orderBy("chapter" ) , orderBy('para')) ;
        onSnapshot(q , (snapshot) => {
          let book = [] ;
          snapshot.docs.forEach((doc) => {
            book.push({...doc.data()  , id : doc.id})
          })
          setBookContent(book[0]);
          // console.log(book); //here we are getting the complete book collection 
        })
    }
    //This page is for reading the paragraph carefully !! 
    //next page from this would be to translate the paragraph 

  return (
    <ScrollView>
      <View className="mt-4">
        
        <Text className="text-lg ml-4">Read The Paragraph Carefully :</Text>
      </View>
      <View className=" w-3/4 mt-8 mx-auto flex justify-center align-middle">
        <Text className="text-xl flex justify-center align-middle">{bookContent.english}</Text>
      </View>
      {/* <View>
        <Text className="text-xl">{bookContent.french}</Text>
      </View> */}
       <TouchableOpacity className="mt-24 ml-12 p-3 mr-12 rounded-2xl" style={styles.container} onPress={()=>handleClick(bookName , bookContent)}> 
              <View> 
                <Text className="m-auto text-lg text-white font-bold">BEGIN TRANSLATION</Text> 
              </View> 
      </TouchableOpacity>
      
    </ScrollView>

  )
}

export default BookRenderingPage
const styles = StyleSheet.create({
  container: {
    backgroundColor : "#c45c5b",
  }
});