import { ScrollView, TouchableOpacity, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from "@react-navigation/native"
import initializeFirebase from '../config/firebase.js'
import { getFirestore, onSnapshot, doc, getDoc, getDocs } from "firebase/firestore";
import { collection, query, where } from "firebase/firestore";
import { ModalRN } from './ModalRN.js'
import { useFonts } from 'expo-font';

export default function UserCards() {
    const app = initializeFirebase();
    const db = getFirestore();
    const route = useRoute();

    // const [ct , setCt] = useState(0) ; 

    // const updateFunction = (count) => {
    //     setCt(count + 1) ; 
    // }

    const [userData, setUserData] = useState({});
    const [books, setBooks] = useState([]);


    const getBookInRealTime = (emailId) => {
        const userRef = collection(db, "users");
        const q = query(userRef, where("emailId", "==", emailId));
        onSnapshot(q, (snapshot) => {
          let book = [];
          snapshot.docs.forEach((doc) => {
            book.push({ ...doc.data(), id: doc.id })
          })
          // console.log("book0", book[0]);
          setBookContent(book[0]);
    
          
        })
      }

    useEffect(() => {
        const name = route.params?.name;
        const emailId = route.params?.emailId;
        const password = route.params?.password;
        const jobs = route.params?.jobs;
        const userID = route.params?.id ; 

        // console.log(name , emailId , password , jobs) ; 

        setUserData({ name, emailId, password, jobs , userID });
        setBooks(Object.keys(jobs));
        console.log("here , " , userData) ; 

    }, []);

    // console.log("here , ", userData);
    const handleClick = () => {
    }

    const [loaded] = useFonts({
        MontserratSemiBold : require("../assets/fonts/Montserrat-SemiBold.ttf"),
        MontserratBold : require("../assets/fonts/Montserrat-Bold.ttf")
      })
      if(!loaded) return null ;


    return (
        <ScrollView>
            <View className="ml-6 mt-12">
                <View className="w-2/3 flex flex-row justify-between">

                    <Text className="text-xl underline" style={{fontFamily : "MontserratBold"}}>Email-Id:</Text>
                    <Text className="text-xl text-[#c45c5b]" style={{fontFamily : "MontserratSemiBold"}}>
                        {userData.emailId}
                    </Text>
                </View>

                <View className="w-1/2 flex flex-row justify-between">
                    <Text className="text-xl underline" style={{fontFamily : "MontserratBold"}}>Password:</Text>
                    <Text className="text-xl text-[#c45c5b]" style={{fontFamily : "MontserratSemiBold"}}>
                        {userData.password}
                    </Text>
                </View>
            </View>

            {/* <View>
                <Text>List of Texts Alloted</Text>
            </View> */}
            <View className="mt-5 ml-4 flex flex-col space-y-3">
                {
                    books.map((item, index) => {
                        return (<>
                            <TouchableOpacity key={index} className="mt-4 p-5 mr-4 rounded-2xl" style={styles.container} onPress={() => handleClick()} >
                                <View className="flex flex-row justify-between"  >
                                    {/* <Text className="text-lg text-white font-bold">{item.charAt(0).toUpperCase() + item.slice(1)}</Text> */}
                                    <Text className="text-lg text-white" style={{fontFamily : "MontserratBold"}}>{item.toUpperCase()}</Text>
                                    <Text className="text-lg text-white underline" style={{fontFamily : "MontserratBold"}}>{userData.jobs[item].toUpperCase()}</Text>
                                </View>
                                {/* <View>

                    </View> */}
                            </TouchableOpacity>
                        </>)
                    })
                }
            </View>

            {/* yaha par ek add button ka option denge hum */}

            {/* <TouchableOpacity className="mx-auto mt-8 w-fit rounded-2xl" style={styles.container} onPress={() => addBook()} >
                                <Text className="text-4xl font-semibold text-white px-4 py-1">+</Text>
                    
            </TouchableOpacity> */}

            <ModalRN email={userData.emailId} jobs = {userData.jobs} userId = {userData.userID} func={updateFunction} ct = {ct} />



        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#c45c5b",
    }
});