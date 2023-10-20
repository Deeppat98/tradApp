import { ActivityIndicator ,  ScrollView, TouchableOpacity, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import initializeFirebase from '../config/firebase.js'
import { getFirestore, onSnapshot, doc, getDoc, getDocs } from "firebase/firestore";
import { collection, query, where } from "firebase/firestore";
import { useFonts } from 'expo-font';

//Upar mujhe saari available books ke names show karne padenge 
const AdminPanel = ({navigation}) => {
  const app = initializeFirebase();
  const db = getFirestore();
  const [usersData, setUsersData] = useState([]);
  const [loading , setLoading] = useState(true);
  

  

  const getUsers = async () => {
    const userRef = collection(db, 'users');
    const q = query(userRef)
    onSnapshot(q, (snapshot) => {
      let users = [];
      snapshot.docs.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id })
      })
      console.log(users);
      setUsersData(users);
      setLoading(false);

    })
  }

  const handleClick = (name , emailId , id , jobs , password) => {
    navigation.navigate("UserCards" , {name: name, emailId : emailId , jobs : jobs , password :  password }); 
  }
  useEffect(() => {
    getUsers();
  }, [])

  const [loaded] = useFonts({
    MontserratSemiBold : require("../assets/fonts/Montserrat-SemiBold.ttf"),
    MontserratBold : require("../assets/fonts/Montserrat-Bold.ttf")
  })
  if(!loaded) return null ;

  return (
    <ScrollView>
      <View className="mt-8 mx-auto">
        <Text className="text-2xl font-semibold" style={{ color: "#c45c5b", fontFamily : "MontserratBold"}}>USERS</Text>
      </View>

      <View>

        {
          loading === true ? <ActivityIndicator size = "large" className="mt-12" color="#c45c5b" />
          :
          <View className="mt-5 ml-4 flex flex-col space-y-3">
            {
              usersData.map((item, index) => {
                return (<>
                  <TouchableOpacity key={index} className="mt-4 p-5 mr-4 rounded-2xl" style={styles.container} onPress={()=>handleClick(item.name , item.emailId , item.id , item.jobs, item.password)} >
                    <View className="flex flex-row justify-between"  >
                      <Text className="text-lg text-white"  style={{fontFamily : "MontserratBold"}}>{item.name}</Text>
                    </View>
                    <View>
                      <Text className="text-md text-white underline" style={{fontFamily : "MontserratBold"}}>{item.emailId}</Text>

                    </View>
                  </TouchableOpacity>
                </>)
              })
            }
          </View>
        }

      </View>
    </ScrollView>
  )
}

export default AdminPanel

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#c45c5b",
  }
});