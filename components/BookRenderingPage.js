import { ScrollView, StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import { useRoute } from "@react-navigation/native"
import React, { useEffect, useState } from 'react'
import initializeFirebase from '../config/firebase.js'
import { getFirestore } from 'firebase/firestore'
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";

const BookRenderingPage = ({ navigation }) => {
  const route = useRoute();
  const app = initializeFirebase();
  const db = getFirestore();
  const [bookName, setBookName] = useState("");
  const [bookContent, setBookContent] = useState([]);
  const [chapter, setChapter] = useState("");
  const [para, setPara] = useState("");
  const [job, setJob] = useState("");
  const [book, setBook] = useState([]);

  useEffect(() => {
    const name = route.params?.book;
    const workOnBook = route.params?.job;  //matlab is book pe kya kaam hona hai //
    //translation ya proofreading etc.. 
    setJob(workOnBook);

    setBookName(name);
    if (workOnBook === 'translator') {
      getBookDataFunctionForTranslation(name);
    }
    if (workOnBook === 'proofreader') {
      getBookDataFunctionForProofReading(name);
    }

  }, [])
  const [sentences , setSentences] = useState([]) ; 
  const handleClick = (bookName, bookContent) => {
    const sentence = bookContent.english.split(".");
    setSentences(sentence);
    navigation.navigate("SentencePage", {bookname: bookName, bookcontent: bookContent, chapter: chapter, para: para })
  }

  const getBookDataFunctionForTranslation = (name) => {
    const userRef = collection(db, name);
    const q = query(userRef, where("translationStatus", "==", "null"), orderBy("chapter"), orderBy('para'));
    onSnapshot(q, (snapshot) => {
      let book = [];
      snapshot.docs.forEach((doc) => {
        book.push({ ...doc.data(), id: doc.id })
      })
      setBookContent(book[0]);
      setBook(book);
    })
  }


  const getBookDataFunctionForProofReading = (name) => {
    const userRef = collection(db, name);
    // const q = query(userRef , where("emailId" , "==" , email) , orderBy("chapter" ) , orderBy('para')) ;
    // where('translationStatus' , '!==' , 'null') , 
    const q = query(userRef, where("translationStatus", "==", "translation_completed"), orderBy("chapter"), orderBy('para'));
    onSnapshot(q, (snapshot) => {
      let book = [];
      snapshot.docs.forEach((doc) => {
        book.push({ ...doc.data(), id: doc.id })
      })
      setBookContent(book[0]);
      setBook(book);
      // console.log(book); //here we are getting the complete book collection 
    })
  }


  return (
    <ScrollView>

      {
        job === "translator"
          ?
          <>
          {
            (book.length === 0)
            ?
            <>
            <View className="mt-10 ml-10 mr-10 text-2xl font-semibold">
              <Text>Nothing Left For Translation !!</Text>
            </View>
            </>
            :
            <>
            <View className="mt-4">
              <Text className="text-lg ml-4">Read The Paragraph Carefully :</Text>
            </View>
            <View className=" w-3/4 mt-8 mx-auto flex justify-center align-middle">
              <Text className="text-xl flex justify-center align-middle">{bookContent.english}</Text>
            </View>

            <TouchableOpacity className="mt-24 ml-12 p-3 mr-12 rounded-2xl" style={styles.container} onPress={() => handleClick(bookName, bookContent)}>
              <View>
                <Text className="m-auto text-lg text-white font-bold">BEGIN TRANSLATION</Text>
              </View>
            </TouchableOpacity>
            </>
          }
            
          </>

          :


          <>
            {
              (book.length === 0)
                ?
                <>
                <View className="mt-10 ml-10 mr-10 text-2xl font-semibold">
                  <Text>Please Wait While Translation Work Is Going On For This Text !!</Text>
                </View>
                </>
                :
                <>
                  <View className="mt-4">
                    <Text className="text-lg ml-4">Read The Paragraph Carefully :</Text>
                  </View>
                  <View className=" w-3/4 mt-8 mx-auto flex justify-center align-middle">
                    <Text className="text-xl flex justify-center align-middle">{bookContent.english}</Text>
                  </View>

                  <TouchableOpacity className="mt-24 ml-12 p-3 mr-12 rounded-2xl" style={styles.container} onPress={() => handleClick(bookName, bookContent)}>
                    <View>
                      <Text className="m-auto text-lg text-white font-bold">BEGIN PROOFREADING</Text>
                    </View>
                  </TouchableOpacity>
                </>

            }

          </>
      }

    </ScrollView>

  )
}

export default BookRenderingPage
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#c45c5b",
  }
});