import { useFonts } from 'expo-font';


export default function loadFonts(){
    const [loaded] = useFonts({
        MontserratSemiBold : require("../assets/fonts/Montserrat-SemiBold.ttf"),
        MontserratBold : require("../assets/fonts/Montserrat-Bold.ttf")
      })
    if(!loaded) return null ;
      
}