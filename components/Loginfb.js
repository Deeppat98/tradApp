import { StyleSheet, Text, Alert, View, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import { React, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const logoimg = require("../images/baps_logo.png");
// import {firebase} from "firebase" ; 
// import { initializeApp } from '@react-native-firebase/app';
// import { auth } from '@react-native-firebase/auth';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { SafeAreaView } from 'react-native-safe-area-context';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    // const auth = firebase.auth();

    // const handleLogin = async () => {
    //     const firebaseConfig = {
    //         apiKey: "AIzaSyCIJ6htCQNyNCbpoFQMjuv_i1T-I2PW668",
    //         authDomain: "testing-80e82.firebaseapp.com",
    //         projectId: "testing-80e82",
    //         storageBucket: "testing-80e82.appspot.com",
    //         messagingSenderId: "861304726764",
    //         appId: "1:861304726764:web:2044115b84a0cb369e31c9",
    //         measurementId: "G-RVN16YRGH9"
    //     };
    //     const app = initializeApp(firebaseConfig);
    //     const auth = getAuth(app);
    //     // const email = username;
    //     // const passwd = password;

    //     // Authenticate user using the provided credentials
    //     // const auth = getAuth();
    //     try {
    //         const userCredential = await signInWithEmailAndPassword(auth, username, password);
    //         const user = userCredential.user;
    //         Alert.alert("Signed In Success", user.uid);
    //       } catch (error) {
    //         const errorCode = error.code;
    //         const errorMessage = error.message;
    //         Alert.alert("Error Occurred", errorMessage);
    //       }
    // };
    return (
        <>
            {/* <ScrollView> */}
            {/* <View> */}


                {/* <ScrollView style={{ alignItems: "center", marginTop: 50 }}> */}
                    <Image source={logoimg} style={{ width: 100, height: 130 }} />
                {/* </ScrollView> */}

                {/* <ScrollView style={{ flex: 2, alignItems: "center" }}> */}
                    <Text style={{ color: "#c45c5b", fontSize: 30, fontWeight: "bold" }}>BAPS Translation</Text>
                {/* </ScrollView> */}

                <SafeAreaView style={styles.container}>
                    {/* <Text style={styles.title}>Login</Text> */}
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={username}
                        onChangeText={setUsername}
                        placeholderTextColor="#c45c5b"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                        placeholderTextColor="#c45c5b"
                    />
                    {/* <TouchableOpacity style={styles.button} onPress={handleLogin}> */}
                    <TouchableOpacity style={styles.button} onPress={() => { }}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </SafeAreaView>

            {/* </View> */}
            {/* </ScrollView> */}
        </>
    )
}

export default Login

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
        color: "#c45c5b"
    },
    button: {
        backgroundColor: '#c45c5b',
        borderRadius: 5,
        padding: hp('2%'),
        width: wp('80%'),
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: hp('2%'),
        fontWeight: "bold"
    },
});