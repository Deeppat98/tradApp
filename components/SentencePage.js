import { Alert, TextInput, TouchableOpacity, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useEffect, useState, useCallback } from 'react'
import { useRoute } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getFirestore, onSnapshot, collection, doc, setDoc, Timestamp, query, where, orderBy } from "firebase/firestore";
import initializeFirebase from '../config/firebase';

// AsyncStorage

const SentencePage = ({ navigation }) => {

  initializeFirebase();
  const db = getFirestore();
  const [ct, setct] = useState(0);

  const route = useRoute();
  const {bookname, bookcontent, job} = route.params
  // console.log("bookcontent initial" , bookcontent) ; 
  const [jobs , setJobs] = useState(job) ; 
  const [bookName, setBookName] = useState(bookname)
  const [bookContent, setBookContent] = useState(bookcontent)
  const [sentenceTillTranslated, setSentenceTillTranslated] = useState("");
  const [completeNewSentence , setCompleteNewSentence ] = useState("") ; 

  const [englishText, setEnglishText] = useState("");
  const [frenchText, setFrenchText] = useState("");
  const [lastSentence , setLastSentence] = useState(null);
  


  useEffect(() => {
    // console.log("count ", ct);

    

    const lastSentence = bookContent.lastSentenceTranslated;
    setSentenceTillTranslated(bookContent.translationBySentence) ; 
    setLastSentence(lastSentence);
    const SentencesLeft = (bookContent.english.split("."))

    const newEnglishText = [];
    for (let i = lastSentence; i < SentencesLeft.length - 1; i++) {
      newEnglishText.push(SentencesLeft[i]);
    }
    // if (newEnglishText.length === 0) {
    //   Alert.alert("completed");
    //   navigation.navigate("BookRenderingPage", { book: bookName, job: work });
    // }

    const SentencesLeftInFrench = (bookContent.french.split("."));
    const newFrenchText = [];
    for (let i = lastSentence; i < SentencesLeftInFrench.length - 1; i++) {
      newFrenchText.push(SentencesLeftInFrench[i]);
    }
    

    setFrenchText(newFrenchText[0]) ; 
    setEnglishText(newEnglishText[0]) ; 
    getBookDataFunctionForTranslation(bookName);

    if((bookContent.totalSentences)-1 === lastSentence) {
      navigation.navigate("Publications");
    }

   
  }, [ct , getBookDataFunctionForTranslation]);

  const getBookDataFunctionForTranslation = (name) => {
    const userRef = collection(db, name);
    const q = query(userRef, where("translationStatus", "==", "null"), orderBy("chapter"), orderBy('para'));
    onSnapshot(q, (snapshot) => {
      let book = [];
      snapshot.docs.forEach((doc) => {
        book.push({ ...doc.data(), id: doc.id })
      })
      // console.log("book0", book[0]);
      setBookContent(book[0]);

      
    })
  }

  const handleClick = async () => {
    setCompleteNewSentence(sentenceTillTranslated + frenchText);
    const newString = sentenceTillTranslated + frenchText ; 
    let newText = newString.replaceAll('.', ' ');
    let finalText = newText.replaceAll('  ', ' ');
    finalText = finalText.trim() ; 
    finalText += "." ;
    console.log("cameHere" , finalText); 
    const userName = await AsyncStorage.getItem('name');
    const citiesRef = collection(db, bookName);
    const date = new Date();
    await setDoc(doc(citiesRef, bookContent.id), {
      translatedBy: userName,
      translatedAt: date,
      lastSentenceTranslated: lastSentence + 1,
      translationBySentence: finalText ,
      translationStatus :  (((bookContent.totalSentences)-1 === lastSentence) ? "translation_completed" : "null" )
      // : "translation_in_progress")
    }, { merge: true });
    // Alert.alert("Hurray ! You just translated this sentence !\n\n", "Go Ahead with next one");

    
    Alert.alert('Done', 'Sentence Translated Successfully !', [
      {
        text: 'Cancel',
        // onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      // {text: 'Next', onPress: () => navigation.navigate("SentencePage", { bookname: bookName, bookcontent: bookContent })},
      {text: 'Next', onPress: () => {
          // console.log()
          const total = (bookContent.totalSentences) ; 
          if(lastSentence === total-1){
            Alert.alert("Paragraph Finished" , 'Paragraph Translated Successfully !' , [
              {
                text : 'Go To Pubilcations' , onPress : () => {
                  navigation.navigate("Publications") ; 
                }

              } , 
              {
                text : 'Next Paragraph' , onPress : () => {
                  navigation.navigate("BookRenderingPage" , {book : bookName , job : jobs}) ; 
                }
              }
            ]) ; 
          }
          else{
            setct(ct + 1)}
          }
          
      },
      
    ]);
    
    
  }

  // const nextSentence = () => {
  //   // getBookDataFunctionForTranslation(bookName);
  //   // console.log(frenchText);
  //   // const translationBySentence = (sentenceTillTranslated + frenchText) ; 
  //   // const total = translationBySentence.split(".").size ; 
    
  //   // console.log(total);
  //   setct(ct+1);
  //   navigation.navigate("SentencePage", { bookname: bookName, bookcontent: bookContent })
  // }


  return (
    <ScrollView>
      <Text className="text-lg mt-3 mx-auto">Translate the sentence in french !</Text>
      <View className=" w-3/4 mt-8 mx-auto flex justify-center align-middle">
        <Text className="text-xl flex justify-center align-middle">{englishText}</Text>
      </View>

      <View className="h-fit w-3/4 mt-8 text-lg mx-auto flex justify-center align-middle bg-white">
        <TextInput
          editable
          multiline
          className="text-lg"
          value={frenchText}
          onChangeText={text => setFrenchText(text)}
          style={{ padding: 10, textAlign: 'justify' }}
        />
      </View>
      <View className="flex flex-row justify-around mt-12">
        <TouchableOpacity className="m-auto mt-4 ml-24 px-7 py-3 mr-24 rounded-2xl mb-12" style={styles.container} onPress={handleClick}>
          <View className="flex flex-row justify-between m-auto">
            <Text className="text-lg text-white font-bold underline">Save</Text>
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity className="m-auto mt-4 ml-24 p-3 mr-24 rounded-2xl mb-12" style={styles.container} onPress={nextSentence}>
          <View className="flex flex-row justify-between m-auto">
            <Text className="text-lg text-white font-bold underline">Next Sentence</Text>
          </View>
        </TouchableOpacity> */}

      </View>
    </ScrollView>
  )
}

export default SentencePage

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#c45c5b",
  }
});