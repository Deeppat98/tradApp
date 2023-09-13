import { View, Text, TextInput,ScrollView,StyleSheet ,TouchableOpacity , Alert} from 'react-native'
import React, {useEffect , useState} from 'react'
import { useRoute } from "@react-navigation/native"

const TranslationPage = () => {
    const route = useRoute(); 
    const [bookContent , setBookContent] = useState([]) ; 
    const [text, setText] = useState("");
    useEffect(() => {
        const bookname = route.params?.bookname ; 
        const bookcontent = route.params?.bookcontent ; 
        setBookContent(bookcontent);
        setText(bookcontent.french);
    } , [])
    
    const handleClick = () => {
      Alert.alert("Woah ! You just translated this paragraph !") ; 
    }
    // console.log(b) ; 
  return (
    <ScrollView>
      <Text className="text-lg mt-3 mx-auto">Translate the previous read text in french !</Text>
      {/* <Text>{bookContent.english}</Text> */}
      <View className=" w-3/4 mt-8 mx-auto flex justify-center align-middle">
        <Text className="text-xl flex justify-center align-middle">{bookContent.english}</Text>
      </View>
      {/* <View className=" w-3/4 mt-8 mx-auto flex justify-center align-middle">
        <Text className="text-xl flex justify-center align-middle">{bookContent.french}</Text>
      </View> */}
      <View className="h-fit w-3/4 mt-8 text-lg mx-auto flex justify-center align-middle bg-white">
      <TextInput
        editable
        multiline
        className="text-lg"
        value={text}
        onChangeText={text => onChangeText(text)}
        
        style={{padding: 10 , textAlign: 'justify'}}
      />
      </View>
      
      {/* <Text>{bookContent.french}</Text> */}
      {/* <textarea class="caret-[#50d71e]"></textarea> */}
      
        <TouchableOpacity className="m-auto mt-4 ml-24 p-5 mr-24 rounded-2xl mb-12" style={styles.container} onPress={()=>handleClick()}> 
              <View className="flex flex-row justify-between m-auto"> 
                <Text className="text-lg text-white font-bold underline">Submit And Save</Text> 
              </View> 
        </TouchableOpacity>
    </ScrollView>
  )
}

export default TranslationPage

const styles = StyleSheet.create({
  container: {
    backgroundColor : "#c45c5b",
  }
});