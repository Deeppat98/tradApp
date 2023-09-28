import {Alert,  TextInput, TouchableOpacity, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect , useState } from 'react'
import { useRoute } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getFirestore ,onSnapshot ,collection, doc, setDoc, Timestamp } from "firebase/firestore"; 
import initializeFirebase from '../config/firebase';
// AsyncStorage



const SentencePage = ({navigation}) => {
  initializeFirebase() ; 
    const db = getFirestore() ;
    const [ct , setct] = useState(0);
  const route = useRoute();
  const { bookname, bookcontent, chapter, para } = route.params
  // console.log(bookname);
  const [bookName , setBookName] = useState(bookname)
  const [bookContent , setBookContent] = useState(bookcontent)
  // console.log("Bookcontent", bookcontent);

  const lastSentence = bookcontent.lastSentenceTranslated;
  // console.log(lastSentence);
  const SentencesLeft = (bookcontent.english.split("."))
  const [sentenceTillTranslated  , setSentenceTillTranslated] = useState(bookcontent.translationBySentence);
 

  
  const newEnglishText = [];
  for (let i = lastSentence; i < SentencesLeft.length - 1; i++) {
    newEnglishText.push(SentencesLeft[i]);
  }
  // console.log(newEnglishText);

  const SentencesLeftInFrench = (bookcontent.french.split(".")) ; 
  const newFrenchText = [];
  for (let i = lastSentence; i < SentencesLeftInFrench.length - 1; i++) {
    newFrenchText.push(SentencesLeftInFrench[i]);
  }
  const [englishText , setEnglishText] = useState(newEnglishText[0]);
  const [frenchText , setFrenchText] = useState(newFrenchText[0]);


  const handleClick = async () => { 
    // console.log("here1" , sentenceTillTranslated)
    const userName = await AsyncStorage.getItem('name');
    const citiesRef = collection(db, bookName);
    const date = new Date() ; 
    await setDoc(doc(citiesRef, bookContent.id), {
          translatedBy : userName ,
          translatedAt : date,
          lastSentenceTranslated : lastSentence + 1 ,
          translationBySentence : (sentenceTillTranslated) ,
          translationStatus :  ((newEnglishText.length === 0) && "translation_completed" )
          // : "translation_in_progress")
       },{ merge: true });
    Alert.alert("Hurray ! You just translated this sentence !\n\n" ,  "Go Ahead with next one") ; 
    // navigation.navigate("SentencePage", {bookname: bookName, bookcontent: bookContent, chapter: chapter, para: para })
    // navigation.navigate("SentencePage", {bookname: bookName, bookcontent: bookContent, chapter: chapter, para: para })
    console.log(lastSentence);
    console.log(bookContent.english.length);
    
    if(newEnglishText.length  === 0){
        navigation.navigate("BookRenderingPage");
    }


    setct(ct+1);
  }

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


        {/* <TouchableOpacity className="m-auto mt-4 ml-24 p-3 mr-24 rounded-2xl mb-12" style={styles.container} onPress={() => { }}>
          <View className="flex flex-row justify-between m-auto">
            <Text className="text-lg text-white font-bold underline">Previous</Text>
          </View>
        </TouchableOpacity> */}
        <TouchableOpacity className="m-auto mt-4 ml-24 px-7 py-3 mr-24 rounded-2xl mb-12" style={styles.container} onPress={handleClick}>
          <View className="flex flex-row justify-between m-auto">
            <Text className="text-lg text-white font-bold underline">Next</Text>
          </View>
        </TouchableOpacity>

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