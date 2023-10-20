import { StatusBar, Platform , View, Alert, Text, Image, TextInput, ScrollView, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { React, useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { initializeAuth ,getReactNativePersistence ,  getAuth, signInWithEmailAndPassword } from "firebase/auth";
import initializeFirebase from '../config/firebase.js'
import loadFonts from '../config/loadFonts.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';



export default function Login({navigation}){
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loaded] = useFonts({
    MontserratSemiBold : require("../assets/fonts/Montserrat-SemiBold.ttf"),
    MontserratBold : require("../assets/fonts/Montserrat-Bold.ttf")
  })
  if(!loaded) return null ;
  
  const storeData = async (uid) => {
    try {
      await AsyncStorage.setItem('email', username);
      await AsyncStorage.setItem('password' , password) ; 
      // await AsyncStorage.setItem('uid' , uid);
      // await AsyncStorage.setItem('name' , name);
      console.log('set hai');
    } catch (e) {
      // saving error
      console.log("yaha par error" , e.message) ; 
    }
  };
  const handleLogin = async () => {
    
    const app = initializeFirebase();
    // const auth = getAuth(app);
    // const auth = initializeAuth(app, {
    //   persistence: getReactNativePersistence(AsyncStorage)
    // });
    const auth = initializeAuth(app);


    try {
      const userCredential = await signInWithEmailAndPassword(auth, username, password);
      const user = userCredential.user;
      const userEmail = user.email ; 
      await storeData(user.uid);
      console.log(userEmail) ; 
      //For Admin
      if(userEmail === "admin@gmail.com"){
        Alert.alert("Admin Logged In Successfully :)\n");
        navigation.navigate('Admin Panel');
      }

      //For User of Application
      else{
        Alert.alert("Signed In Successfully :)\n");
        navigation.navigate('Publications');
      }
      console.log(user);
      
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      // Alert.alert("Oops :( Some Error Occurred", errorMessage);
      Alert.alert("Invalid EmailID or Password :(");
    }
  };



  return (
    <ScrollView>
    
      <StatusBar backgroundColor="black" barStyle="default" />

      <View style={{ display: "flex", justifyContent: 'center', alignItems: "center", marginTop: 80 }}>
        <Image source={require('../images/baps_logo.png')} style={{ width: 100, height: 130 }} />
      </View>

      <View>
        <Text style={{ color: "#c45c5b", fontSize: 30,  marginTop: 30, textAlign: "center", fontFamily : "MontserratBold"}}>BAPS Translation</Text>
      </View>
      


        <View style={{ width: 100, display: "flex", justifyContent: 'center', alignItems: "left", marginTop: 100 }}>
          <TextInput
            // keyboardavoidingviewenabled={true}
            style={styles.input}
            placeholder="Email"
            value={username}
            onChangeText={setUsername}
            placeholderTextColor="#c45c5b"
          />
          <TextInput
            // keyboardavoidingviewenabled={true}
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="#c45c5b"
          />
        </View>

        {/* <TouchableOpacity style={styles.button} onPress={handleLogin}> */}
        <View style={styles.loginbtn}>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>

     



      {/* </View> */}
    {/* </KeyboardAvoidingView> */}
      </ScrollView>

  )
}

// export default Login

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    marginTop: -240,
    border: "2px solid black",

  },
  title: {
    fontSize: hp('3%'), // Responsive font size
    marginBottom: hp('5%'),
  },
  input: {
    width: wp('80%'), // Responsive width
    padding: hp('1.5%'),
    marginBottom: hp('2%'),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    fontSize: 18,
    // color: "#c45c5b",
    marginLeft: 40,
    // fontFamily : `${MontserratSemiBold}`
    fontFamily : "MontserratBold"

  },

  loginbtn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // borderWidth : 2 
  },
  button: {
    backgroundColor: '#c45c5b',
    borderRadius: 5,
    padding: hp('2%'),
    width: wp('80%'),
    alignItems: 'center',

    

    // marginLeft: 40

  },
  buttonText: {
    color: 'white',
    fontSize: hp('2.5%'),
    fontWeight: "bold",
    // fontFamily : `${MontserratSemiBold}`
    fontFamily : "MontserratBold"
  },
});