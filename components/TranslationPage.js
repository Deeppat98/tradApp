import { View, Text,TextInput } from 'react-native'
import React, {useEffect , useState} from 'react'
import { useRoute } from "@react-navigation/native"

const TranslationPage = () => {
    const route = useRoute(); 
    const [bookContent , setBookContent] = useState([]) ; 
    useEffect(() => {
        const bookname = route.params?.bookname ; 
        const bookcontent = route.params?.bookcontent ; 
        setBookContent(bookcontent);
        // setBookName(name);
        // getBookDataFunction(name); 
    } , [])


  return (
    <View>
      <Text>Translate the previous read text in french !</Text>
      <Text>{bookContent.english}</Text>
      <Text>{bookContent.french}</Text>
      {/* <textarea class="caret-[#50d71e]"></textarea> */}
      <TextInput
        //   style={CustomStyle}
          label="Mobile number or email"
          value={mail}
          mode="outlined"
        //   onChangeText={(mail) => setMail(mail)}
          theme={{
            colors: {
              placeholder: "white",
              text: "white",
              primary: "white",
              backgroundColor: "transparent",
            },
          }}
        //   onFocus={() => setFocus(true)}
        //   onTextInput={() => setFocus(false)}
        />
    </View>
  )
}

export default TranslationPage