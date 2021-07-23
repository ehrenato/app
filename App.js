import React, {useState,useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './views/Login';
import Externo from './views/Externo';
import AreaRestrita from "./views/arearestrita/AreaRestrita";
import Mensagens from "./views/arearestrita/Mensagens";

export default function App() {

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>   
        <Stack.Screen
                name="Login"
                component={Login}
                options={{
                headerShown:false,
                title:"APP-IDEMA",
                headerStyle:{backgroundColor:"#0080C6"},
                headerTintColor:'#fff',
                headerTitleStyle:{fontWeight:'bold', alignSelf:'center'}
            }}
        />
       <Stack.Screen name="Externo" options={{headerShown:false}} component={Externo} />
       <Stack.Screen name="AreaRestrita" options={{headerShown:false}} component={AreaRestrita} />
       <Stack.Screen name="Mensagens" options={{headerShown:false}} component={Mensagens} />
      </Stack.Navigator>
    </NavigationContainer>
);
}