import { View, Text,TouchableOpacity ,StyleSheet} from 'react-native'
import React from 'react'

const Logout = () => {

    const handleClick = async () => {
        try {
            await AsyncStorage.removeItem('email');
            await AsyncStorage.removeItem('password');
            await AsyncStorage.removeItem('uid');
        }
        catch(exception) {
            console.log("error occurred while removing async storage")
        }
    }
  return (
    <View>
      <Text>You Are Successfully Logged Out !</Text>
      <TouchableOpacity className="mt-4 p-5 mr-4 rounded-2xl" style={styles.container} onPress={()=>handleClick()}> 
              <View className="flex flex-row justify-between"> 
                <Text className="text-lg text-white font-bold underline">Return Home !</Text> 
                {/* <Text className="text-lg text-white font-bold underline"></Text>  */}
              </View> 
     </TouchableOpacity>
    </View>
  )
}

export default Logout

const styles = StyleSheet.create({
    container: {
      backgroundColor : "#c45c5b",
    }
  });