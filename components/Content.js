import React , {useEffect , useState} from 'react'
import {View , Text} from 'react-native'
import { initializeApp } from "firebase/app";
import { getFirestore, collection ,doc, getDoc,  getDocs } from "firebase/firestore";
import initializeFirebase from '../config/firebase.js'
import { SafeAreaView } from "react-native";
import loadFonts from '../config/loadFonts.js';

const Content = () => {
      const app = initializeFirebase() ; 
      const db = getFirestore(app); 
      
      loadFonts(); 

       
      const [data , setData] = useState([])
      
      async function getCities(db) {
        const citiesCol =  collection(db, 'gita');
        const citySnapshot = await getDocs(citiesCol);
        const cityList =  citySnapshot.docs.map(doc => doc.data());
        console.log(cityList); 
        setData(cityList)  ; 
        return cityList;
      }
      useEffect(() => {
        getCities(db);  
      },[])
  return (
    <>
{/* 
<Box p="2" bg="primary.500" _text={{
      fontSize: 'md',
      fontWeight: 'medium',
      color: 'warmGray.50',
      letterSpacing: 'lg'
    }} shadow={2}>
        This is a Box
      </Box> */}

    {/* <BoxDesign />  */}
      
    {
            data.map((x , index) => {
                return (<>
                <View key={index}>
                  <Text className="text-md mt-5" style={{fontFamily : "MontserratSemiBold"}}>Name : {x.english}</Text>
                  <Text style={{fontFamily : "MontserratSemiBold"}}>City : {x.french}</Text>
                </View>
                </>)
            })
        }
        {/* <Text>Hello Bro ! How are you !</Text> */}
    </>
  )
}

export default Content