import { View, Alert, Text, Image, TextInput, ScrollView, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { React, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// import ReactNativeAsyncStorage from 'react-native-async-storage/async-storage';


export default function Login(){


  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = async () => {
    const firebaseConfig = {
      apiKey: "AIzaSyCPPsIlSr9d2JzOa55ctuHVqMYBmtv0ZB0",
      authDomain: "baps-translation.firebaseapp.com",
      projectId: "baps-translation",
      storageBucket: "baps-translation.appspot.com",
      messagingSenderId: "269187257441",
      appId: "1:269187257441:web:156e88cf69cac13aaf4620"
    };
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, username, password);
      const user = userCredential.user;
      Alert.alert("Signed In Successfully :)\n", "User Id: " + user.uid);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      // Alert.alert("Oops :( Some Error Occurred", errorMessage);
      Alert.alert("Invalid EmailID or Password :(");
    }
  };



  return (
    <ScrollView>

      <View style={{ display: "flex", justifyContent: 'center', alignItems: "center", marginTop: 80 }}>
        <Image source={require('../images/baps_logo.png')} style={{ width: 100, height: 130 }} />
      </View>

      <View>
        <Text style={{ color: "#c45c5b", fontSize: 30, fontWeight: "bold", marginTop: 30, textAlign: "center" }}>BAPS Translation</Text>
      </View>
      <KeyboardAvoidingView>


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

      </KeyboardAvoidingView>




      {/* </View> */}
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
    fontSize: hp('2%'),
    fontWeight: "bold"
  },
});