import { StatusBar , View, Text  , Button ,StyleSheet, Alert,TouchableOpacity } from 'react-native'
import React, { useEffect , useState } from 'react'
import initializeFirebase from '../config/firebase.js'
import { getFirestore ,onSnapshot , doc, getDoc,  getDocs } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, query, where } from "firebase/firestore";
import { useFonts } from 'expo-font';

const Publications = ({navigation}) => {
  


  const app = initializeFirebase();
  const db = getFirestore(); 
  // const [email , setEmail] = useState([]) ; 
  const [allottedBooks , setAllottedBooks] = useState([]);
  const [userData , setUserData] = useState([]) ; 
  const [jobs , setJobs] = useState({})

  const setName = async (name) => {
    await AsyncStorage.setItem('name' , name)
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


  const getData = async () => {
    try {
      const uid = await AsyncStorage.getItem('uid');
      const email = await AsyncStorage.getItem('email');
      const password = await AsyncStorage.getItem('password');
      // if (email && password && uid) {
        // console.log("getdata ke andar aa gaye hain");
          getPublications(email , password , uid); 
      // }
    } catch (e) {
      // error reading value
      console.log("error");
    }
  };

  useEffect(() => {
    getData() ; 
  }, [])


  const [loaded] = useFonts({
    MontserratSemiBold : require("../assets/fonts/Montserrat-SemiBold.ttf"),
    MontserratBold : require("../assets/fonts/Montserrat-Bold.ttf")
  })
  if(!loaded) return null ;


  const handleClick = (item , workOnBook) => {
    
      console.log("button clicked"); 
      navigation.navigate("BookRenderingPage" , {book : item , job : workOnBook})
      // Alert.alert("work" , workOnBook)
  }
  return (
    <View className="mt-0 bg-gray-200 h-screen" style={{fontFamily : "MontserratBold"}}>

      <StatusBar backgroundColor="black" barStyle="default" />
      <Text className="ml-4 mt-2 text-xl" style={{fontFamily : "MontserratBold"}}>Welcome {userData.name}, </Text>
      {/* <Text className="ml-4 text-xl">Email : {userData.emailId}</Text> */}
      {/* <br /> */}
      <Text className="ml-4 text-lg mt-4" style={{fontFamily : "MontserratBold"}}>Good To See You Here Again !!</Text>
      <View className="mt-5 ml-4 flex flex-col space-y-3">
      {
        allottedBooks.map((item , index) => {
          return (<>
           <TouchableOpacity key={index} className="mt-4 p-5 mr-4 rounded-2xl" style={styles.container} onPress={()=>handleClick(item , jobs[item])}> 
              <View className="flex flex-row justify-between"  > 
                <Text className="text-lg text-white font-bold underline" style={{fontFamily : "MontserratBold"}}>{item.toUpperCase()}</Text> 
                <Text className="text-lg text-white font-bold underline" style={{fontFamily : "MontserratBold"}}>{jobs[item].toUpperCase()}</Text> 
              </View> 
            </TouchableOpacity>
          </>)
        })
      }
      </View>
    </View>
  )
}

export default Publications

const styles = StyleSheet.create({
  container: {
    backgroundColor : "#c45c5b",
  }
});