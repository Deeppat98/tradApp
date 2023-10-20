import React, {useState} from 'react';
import {TextInput , Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import { useFonts } from 'expo-font';


export const ModalRN = ({emailId}) => {

  const [modalVisible, setModalVisible] = useState(false);

  const [newjob , setNewJob] = useState({name : "" , jobType : ""}) ; 

  const ConfirmHandler = () => {
    setModalVisible(!modalVisible) ; 
    // code for adding the newjob object to the jobs of the user database 
  }
  console.log(newjob) ; 

  const handleChange =(e)=>{
    setNewJob({...newjob , [e.target.name] : e.target.value})
  }
  const [loaded] = useFonts({
    MontserratSemiBold : require("../assets/fonts/Montserrat-SemiBold.ttf"),
    MontserratBold : require("../assets/fonts/Montserrat-Bold.ttf")
  })
  if(!loaded) return null ;
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
            {/* <Text style={styles.modalText}>Hello World!</Text>
            <Text style={styles.modalText}>Hello World!</Text> */}
            <TextInput
            name="name"
        style={styles.input}
        onChange={text => setNewJob({name : text})}
        value={newjob.name}
        placeholder="Enter Text Name"
        keyboardType="text"
      />
            <TextInput
            name="jobType"
        style={styles.input}
        onChange={text => setNewJob({jobType : text})}
        value={newjob.jobType}
        placeholder="Enter Job Type"
        keyboardType="text"
      />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              // onPress={() => setModalVisible(!modalVisible)}>
              onPress={ConfirmHandler}>
              <Text style={styles.textStyle}>Confirm</Text>
              {/* onPress={addBookHandler} */}
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
    borderRadius : 50 , 
    padding: 10,
    width: 200 , 
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
    marginTop : 25 , 
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
    fontSize : 17 ,
   fontFamily : "MontserratBold"
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize : 17 
  },
});

