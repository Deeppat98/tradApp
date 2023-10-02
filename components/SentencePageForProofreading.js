import { Alert, TextInput, TouchableOpacity, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useEffect, useState, useCallback } from 'react'
import { useRoute } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getFirestore, onSnapshot, collection, doc, setDoc, Timestamp, query, where, orderBy } from "firebase/firestore";
import initializeFirebase from '../config/firebase';

// AsyncStorage

const SentencePageForProofreading = ({ navigation }) => {

  initializeFirebase();
  const db = getFirestore();
  const [ct, setct] = useState(0);

  const route = useRoute();
  const {bookname, bookcontent, job} = route.params //bookcontent ek aaya hoga bas 
  // console.log("bookcontent initial" , bookcontent) ; 
  const [jobs , setJobs] = useState(job) ; 
  const [bookName, setBookName] = useState(bookname)
  const [bookContent, setBookContent] = useState(bookcontent)
  console.log(bookContent);

  
  const [sentenceTillProofread, setSentenceTillProofread] = useState("");
  const [completeNewSentence , setCompleteNewSentence ] = useState("") ; 

  const [englishText, setEnglishText] = useState("");
  const [frenchText, setFrenchText] = useState("");
  const [lastSentenceProofread , setLastSentenceProofread] = useState(null);
  


  useEffect(() => {
    const lastSentence = bookContent.lastSentenceProofread;
    setSentenceTillProofread(bookContent.proofreadBySentence) ; 
    setLastSentenceProofread(lastSentence);
    const SentencesLeft = (bookContent.english.split("."))

    const newEnglishText = [];
    for (let i = lastSentence; i < SentencesLeft.length - 1; i++) {
      newEnglishText.push(SentencesLeft[i]);
    }

    const SentencesLeftInFrench = (bookContent.translationBySentence.split("."));
    const newFrenchText = [];
    for (let i = lastSentence; i < SentencesLeftInFrench.length - 1; i++) {
      newFrenchText.push(SentencesLeftInFrench[i]);
    }
    

    setFrenchText(newFrenchText[0]) ; 
    setEnglishText(newEnglishText[0]) ; 

    getBookDataFunctionForProofreading(bookName);
   
  }, [ct , getBookDataFunctionForProofreading]);

  const getBookDataFunctionForProofreading = (name) => {
    const userRef = collection(db, name);
    const q = query(userRef, where("translationStatus", "==", "translation_completed"), orderBy("chapter"), orderBy('para'));
    onSnapshot(q, (snapshot) => {
      let book = [];
      snapshot.docs.forEach((doc) => {
        book.push({ ...doc.data(), id: doc.id })
      })
      // console.log("book0", book[0]);
      setBookContent(book[0]);
    })
  }
  console.log(jobs);
  const handleClick = async () => {
    setCompleteNewSentence(sentenceTillProofread + frenchText)
    const userName = await AsyncStorage.getItem('name');
    const citiesRef = collection(db, bookName);
    const date = new Date();
    await setDoc(doc(citiesRef, bookContent.id), {
      proofreadBy: userName,
      proofreadAt: date,
      lastSentenceProofread: lastSentenceProofread + 1,
      proofreadBySentence: sentenceTillProofread + frenchText ,
      translationStatus :  (((bookContent.totalSentences)-1 === lastSentenceProofread) ? "proofreading_completed" : "translation_completed")
      // : "translation_in_progress")
    }, { merge: true });
    // Alert.alert("Hurray ! You just translated this sentence !\n\n", "Go Ahead with next one");

    
    Alert.alert('Done', 'Sentence Proofreading Done !', [
      {
        text: 'Cancel',
        // onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      // {text: 'Next', onPress: () => navigation.navigate("SentencePage", { bookname: bookName, bookcontent: bookContent })},
      {text: 'Next', onPress: () => {
          // console.log()
          const total = (bookContent.totalSentences) ; 
          if(lastSentenceProofread === total-1){
            Alert.alert("Paragraph Finished" , 'Paragraph Proofreading Done Successfully !' , [
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

  return (
    <ScrollView>
      <Text className="text-lg mt-3 mx-auto">Proofread the sentence !</Text>
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


      </View>
    </ScrollView>
  )
}

export default SentencePageForProofreading

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#c45c5b",
  }
});