import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from "./components/Home"
import EachItem from './components/EachItem'
// import  Item from './components/Item'
import Items from './components/Items'
import Login from './components/Login'
// import NewLogin from './components/NewLogin';
import Loginfb from './components/Loginfb'

const Stack = createNativeStackNavigator();


export default function App () {
  
    return (
      <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Loginfb" component={Loginfb} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="EachItem" component={EachItem} />
          <Stack.Screen name="items" component={Items} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  

  return (<>
  </>)
}
