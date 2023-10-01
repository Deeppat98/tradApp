import { StyleSheet, Text, View } from 'react-native'
import React,{useEffect , useState} from 'react'
import initializeFirebase from '../config/firebase.js'
import { getFirestore ,onSnapshot , doc, getDoc,  getDocs , query, where, orderBy, onSnapshot } from "firebase/firestore";


const TranslationPage_Part2 = () => {
    initializeFirebase() ; 
    const db = getFirestore() ;
    const [lastParaNumber , setLastParaNumber] = useState(null);
    const [bookName , setBookName] = useState("") ;
    const [bookContent , setBookContent] = useState([]);


    useEffect(()=>{
        
    })

    const getSentence = async () => {
        const userName = await AsyncStorage.getItem('name');
    }
    const getPublications = async (email , password , uid) => {
        const userRef = collection(db , 'users') ;
        const q = query(userRef , where("emailId" , "==" , email))  
        onSnapshot(q , (snapshot) => {
          let users = [] ;
          snapshot.docs.forEach((doc) => {
            users.push({...doc.data()  , id : doc.id})
          })
          setUserData(users[0]);
          console.log(users[0].jobs); 
          const ab = users[0].jobs ; 
          setName(users[0].name)
          setJobs(ab)
          setAllottedBooks(Object.keys(ab))
          console.log("jobs" , jobs); 
          console.log('publications fetched success');
        })
      }
  return (
    <ScrollView>
      <Text className="text-lg mt-3 mx-auto">Translate the sentence in french !</Text>
      <View className=" w-3/4 mt-8 mx-auto flex justify-center align-middle">
        {/* <Text className="text-xl flex justify-center align-middle">{englishText}</Text> */}
      </View>

      <View className="h-fit w-3/4 mt-8 text-lg mx-auto flex justify-center align-middle bg-white">
        <TextInput
          editable
          multiline
          className="text-lg"
        //   value={frenchText}
        //   onChangeText={text => setFrenchText(text)}
          style={{ padding: 10, textAlign: 'justify' }}
        />
      </View>
      <View className="flex flex-row justify-around mt-12">


        {/* <TouchableOpacity ref={ref} className="hidden m-auto mt-4 ml-24 p-3 mr-24 rounded-2xl mb-12" style={styles.container} onPress={() => this.forceUpdate()}>
          <View className="flex flex-row justify-between m-auto">
            <Text className="text-lg text-white font-bold underline">Previous</Text>
          </View>
        </TouchableOpacity> */}
        <TouchableOpacity className="m-auto mt-4 ml-24 px-7 py-3 mr-24 rounded-2xl mb-12" style={styles.container}>
          <View className="flex flex-row justify-between m-auto">
            <Text className="text-lg text-white font-bold underline">Next</Text>
          </View>
        </TouchableOpacity>

      </View>
    </ScrollView>
  )
}

export default TranslationPage_Part2

const styles = StyleSheet.create({
    container: {
      backgroundColor: "#c45c5b",
    }
  });