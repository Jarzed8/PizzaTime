import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {
  StyleSheet
} from 'react-native';
import { BusinessScreen } from './src/screens/BusinessScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { Business } from './src/YelpAPI';

export type RootStackParamList = {
  Home: undefined;
  BusinessScreen: { business: Business }
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return <NavigationContainer>
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='BusinessScreen' component={BusinessScreen} />
    </Stack.Navigator>
  </NavigationContainer>
};

const styles = StyleSheet.create({
});

export default App;
