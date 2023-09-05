import React , {useEffect , useState} from 'react'
import {View, Text} from 'react-native'
import { initializeApp } from "firebase/app";
import { getFirestore, collection ,doc, getDoc,  getDocs } from "firebase/firestore";

const Content = () => {
    const [data , setData] = useState([])
    const firebaseConfig = {
        apiKey: "AIzaSyCPPsIlSr9d2JzOa55ctuHVqMYBmtv0ZB0",
        authDomain: "baps-translation.firebaseapp.com",
        projectId: "baps-translation",
        storageBucket: "baps-translation.appspot.com",
        messagingSenderId: "269187257441",
        appId: "1:269187257441:web:156e88cf69cac13aaf4620"
      };
      const app = initializeApp(firebaseConfig); 
      const db = getFirestore(app); 
      async function getCities(db) {
        const citiesCol = collection(db, 'gita');
        const citySnapshot = await getDocs(citiesCol);
        const cityList = citySnapshot.docs.map(doc => doc.data());
        // console.log(citiesCol.list_documents());
        console.log(cityList); 
        setData(cityList)  ; 
        return cityList;
      }
      useEffect(() => {
        getCities(db);  
      },[])
  return (
    <>
    {
            data.map((x , index) => {
                return (<>
                <View key={index}>
                <Text>Name : {x.english}</Text>
                <Text>City : {x.french}</Text>
                </View>
                    
                </>)
            })
        }
    </>
  )
}

export default Content