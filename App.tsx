import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack'; // Correção aqui

import Home from './src/pages/Home';
import Sobre from './src/pages/Sobre';
import Tarefas from './src/pages/Tarefas'


const Stack = createNativeStackNavigator(); // Correção aqui

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{
                        headerShown: false,
                    }} />

                <Stack.Screen name="Sobre" component={Sobre} />
                <Stack.Screen name="Tarefas" component={Tarefas}
                    options={{
                        headerShown: false,
                    }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
