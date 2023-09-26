import { View, Text, TextInput,ScrollView,StyleSheet ,TouchableOpacity , Alert} from 'react-native'
import React, {useEffect , useState} from 'react'
import { useRoute } from "@react-navigation/native"
import { getFirestore ,onSnapshot ,collection, doc, setDoc } from "firebase/firestore"; 
import initializeFirebase from '../config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TranslationPage = () => {
    initializeFirebase() ; 
    const db = getFirestore() ;

    const route = useRoute(); 
    const [bookContent , setBookContent] = useState([]) ; 
    const [text, setText] = useState("");
    const [bookName , setBookName] = useState([]) ; 
    useEffect(() => {
        const bookname = route.params?.bookname ; 
        const bookcontent = route.params?.bookcontent ; 
        setBookContent(bookcontent);
        setBookName(bookname)
        setText(bookcontent.french);
    } , [])
    
    const handleClick =async () => {
      const userName = await AsyncStorage.getItem('name');
      const user = await AsyncStorage.getItem('')
      const citiesRef = collection(db, bookName );
      await setDoc(doc(citiesRef), {
            translatedText : text , 
            translatedBy : userName ,
            translatedAt : Date.now()
         }, where('chapter'));
      Alert.alert("Woah ! You just translated this paragraph !") ; 
    }
  return (
    <ScrollView>
      <Text className="text-lg mt-3 mx-auto">Translate the previous read text in french !</Text>
      <View className=" w-3/4 mt-8 mx-auto flex justify-center align-middle">
        <Text className="text-xl flex justify-center align-middle">{bookContent.english}</Text>
      </View>

      <View className="h-fit w-3/4 mt-8 text-lg mx-auto flex justify-center align-middle bg-white">
      <TextInput
        editable
        multiline
        className="text-lg"
        value={text}
        onChangeText={text => setText(text)}
        style={{padding: 10 , textAlign: 'justify'}}
      />
      </View>
      
      {/* <Text>{bookContent.french}</Text> */}
      {/* <textarea class="caret-[#50d71e]"></textarea> */}
      
        <TouchableOpacity className="m-auto mt-4 ml-24 p-5 mr-24 rounded-2xl mb-12" style={styles.container} onPress={handleClick}> 
              <View className="flex flex-row justify-between m-auto"> 
                <Text className="text-lg text-white font-bold underline">Submit And Save</Text> 
              </View> 
        </TouchableOpacity>
    </ScrollView>
  )
}

export default TranslationPage

const styles = StyleSheet.create({
  container: {
    backgroundColor : "#c45c5b",
  }
});