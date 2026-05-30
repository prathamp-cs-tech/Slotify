// navigation/AppNavigator.js

import {
  NavigationContainer,
} from '@react-navigation/native';

import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import Login
  from '../screens/LoginScreen';

import LandingScreen
  from '../screens/LandingScreen';

import SignupScreen
  from '../screens/SignupScreen';

import UserStack
  from './UserStack';

import ProviderStack
  from './ProviderStack';

const Stack =
  createNativeStackNavigator();

export default function AppNavigator() {

  return (

    <NavigationContainer>

      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >

        <Stack.Screen
          name="Landing"
          component={LandingScreen}
        />

        <Stack.Screen
          name="Login"
          component={Login}
        />

        <Stack.Screen
          name="Signup"
          component={SignupScreen}
        />


        <Stack.Screen
          name="UserStack"
          component={UserStack}
        />

        <Stack.Screen
          name="ProviderStack"
          component={ProviderStack}
        />

      </Stack.Navigator>

    </NavigationContainer>

  );

}