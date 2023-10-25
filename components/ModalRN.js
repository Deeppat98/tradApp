import React, { useState } from 'react';
import { TextInput, Alert, Modal, StyleSheet, Text, Pressable, View, Button } from 'react-native';
import { useFonts } from 'expo-font';
import { getFirestore, onSnapshot, collection, doc, setDoc, Timestamp, query, where, orderBy } from "firebase/firestore";
import initializeFirebase from '../config/firebase';
import Dropdown from './Dropdown'


export const ModalRN = ({ navigation , userId , func , jobs , ct }) => {

  initializeFirebase();
  const db = getFirestore();
  const [modalVisible, setModalVisible] = useState(false);
  const [count , setCount] = useState(ct) ; 
  const [textName, setTextName] = useState("");
  const [jobName, setJobName] = useState("");


  const ConfirmHandler = () => {
    setModalVisible(!modalVisible);
  }

  const [loaded] = useFonts({
    MontserratSemiBold: require("../assets/fonts/Montserrat-SemiBold.ttf"),
    MontserratBold: require("../assets/fonts/Montserrat-Bold.ttf")
  })
  if (!loaded) return null;


  const usersRef = collection(db, 'users');
  const addBookHandler = async () => {

    await setDoc(doc(usersRef, userId), {
      jobs : {[textName] : jobName}   //added to map data 
    }, { merge: true });
    setModalVisible(!modalVisible) ; 

    Alert.alert("Success" , "Text and Job Assigned Successfully" )
    setTextName("") ;
    setJobName("") ; 
    // navigation.navigate("Admin Panel"); 
    func(count + 1) ; 
  }

  
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
      
            <TextInput
              name="textName"
              style={styles.input}
              onChangeText={setTextName}
              value={textName}
              placeholder="Enter Text Name"
              keyboardType="text"
            />

            <TextInput
              name="jobName"
              style={styles.input}
              onChangeText={setJobName}
              value={jobName}
              placeholder="Enter Job Type"
              keyboardType="text"
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              // onPress={() => setModalVisible(!modalVisible)}>
              onPress={addBookHandler}>
              <Text style={styles.textStyle}>Confirm</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle} >Assign a New Text</Text>
      </Pressable>

    </View>
  );
};



const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 50,
    padding: 10,
    width: 200,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    marginTop: 25,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#c45c5b",
  },
  buttonClose: {
    backgroundColor: "#c45c5b",
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 17,
    fontFamily: "MontserratBold"
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 17
  },
});

