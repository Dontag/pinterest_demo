import React, { Component } from 'react'
import { Text, StyleSheet, View, StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import Dashboard from './src/Screens/Dashboard';
import Details from './src/Screens/Details';

const Stack = createSharedElementStackNavigator();

class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <StatusBar backgroundColor={"#000000"} />
        <Stack.Navigator screenOptions={{
          gestureEnabled: false,
          headerShown: false,
          cardOverlayEnabled: true,
          cardStyle: { backgroundColor: "transparent" },
        }}
          mode="modal"
          initialRouteName="Dashboard" >
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="Details" component={Details}  />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

export default App;