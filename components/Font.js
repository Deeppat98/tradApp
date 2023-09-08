import { View, Text } from 'react-native'
import React from 'react'
import { useFonts } from 'expo-font'
const Font = () => {

    const [loaded] = useFonts({
        MontserratSemiBold : require("../assets/fonts/Montserrat-SemiBold.ttf"),
        MontserratBold : require("../assets/fonts/Montserrat-Bold.ttf")

    })
    if(!loaded) return null ; 
  return (
    <View>
      <Text className = "flex h-2/3 m-auto text-2xl" style={{fontFamily : "MontserratBold"}}>Hello World !</Text>
    </View>
  )
}

export default Font