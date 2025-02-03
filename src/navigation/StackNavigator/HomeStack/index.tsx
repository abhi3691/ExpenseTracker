import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../../../screens/HomeScreen';
import MangeExpenseScreen from '../../../screens/MangeExpenseScreen';
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade_from_bottom',
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="MangeExpenseScreen" component={MangeExpenseScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
