import { ScrollView, TouchableOpacity, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from "@react-navigation/native"
import initializeFirebase from '../config/firebase.js'
import { getFirestore, onSnapshot, doc, getDoc, getDocs } from "firebase/firestore";
import { collection, query, where } from "firebase/firestore";
import { ModalRN } from './ModalRN.js'

export default function UserCards() {
    const app = initializeFirebase();
    const db = getFirestore();
    const route = useRoute();

    const [userData, setUserData] = useState({});
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const name = route.params?.name;
        const emailId = route.params?.emailId;
        const password = route.params?.password;
        const jobs = route.params?.jobs;

        // console.log(name , emailId , password , jobs) ; 

        setUserData({ name, emailId, password, jobs });
        setBooks(Object.keys(jobs));
        // console.log("here , " , userData) ; 

    }, []);

    console.log("here , ", userData);
    const handleClick = () => {


    }


    return (
        <ScrollView>
            {/* <View className="ml-8">
                <Text >
                    {userData.name}
                </Text>
            </View> */}
            <View className="ml-6 mt-12">
                <View className="w-2/3 flex flex-row justify-between">

                    <Text className="text-xl font-semibold underline" >Email-Id:</Text>
                    <Text className="text-xl text-[#c45c5b] font-semibold">
                        {userData.emailId}
                    </Text>
                </View>

                <View className="w-1/2 flex flex-row justify-between">
                    <Text className="text-xl font-semibold underline" >Password: </Text>
                    <Text className="text-xl text-[#c45c5b] font-semibold">
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
                                    <Text className="text-lg text-white font-bold">{item.toUpperCase()}</Text>
                                    <Text className="text-lg text-white font-bold underline">{userData.jobs[item].toUpperCase()}</Text>
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

            <ModalRN email={userData.emailId} />



        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#c45c5b",
    }
});