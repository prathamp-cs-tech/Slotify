// navigation/UserStack.js

import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import SalonScreen from '../screens/SalonScreen';
import FavoritesScreen from '../screens/FavouritesScreen';
import CategoryScreen from '../screens/CategoryScreen';
import BookingsScreen from '../screens/BookingsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import HelpCenterScreen from '../screens/HelpCenterScreen';
import TermsScreen from '../screens/TermsScreen';

const Stack =
  createNativeStackNavigator();

export default function UserStack() {

  return (

    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >

      <Stack.Screen
        name="Home"
        component={HomeScreen}
      />

      <Stack.Screen
        name="Salon"
        component={SalonScreen}
      />

      <Stack.Screen
        name="Favorites"
        component={FavoritesScreen}
      />

      <Stack.Screen
        name="Category"
        component={CategoryScreen}
      />

      <Stack.Screen
        name="Bookings"
        component={BookingsScreen}
      />

      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
      />

      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
      />

      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
      />

      <Stack.Screen
        name="HelpCenter"
        component={HelpCenterScreen}
      />

      <Stack.Screen
        name="Terms"
        component={TermsScreen}
      />

    </Stack.Navigator>

  );

}