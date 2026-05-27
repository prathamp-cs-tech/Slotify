import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../screens/LoginScreen';
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
import LandingScreen from '../screens/LandingScreen';
import SignupScreen from '../screens/SignupScreen';
import ForgotPass from '../screens/ForgotPass';
import ResetPass from '../screens/ResetPass';
import ProviderHomeScreen from '../screens/ProviderHomeScreen.js';
import EditServiceScreen from '../screens/EditServiceScreen.js';
import AddServiceScreen from '../screens/AddServiceScreen.js';
import ProviderProfileScreen from '../screens/ProviderProfileScreen.js';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Forgot" component={ForgotPass} />
        <Stack.Screen name="Reset" component={ResetPass} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Salon" component={SalonScreen} />
        <Stack.Screen name="Favorites" component={FavoritesScreen} />
        <Stack.Screen name="Category" component={CategoryScreen} />
        <Stack.Screen name="Bookings" component={BookingsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen
          name="Notifications"
          component={NotificationsScreen}
        />
        <Stack.Screen
          name="HelpCenter"
          component={HelpCenterScreen}
        />
        <Stack.Screen name="Terms" component={TermsScreen} />
        <Stack.Screen name="Logout" component={LandingScreen} />
        <Stack.Screen name="ProviderHome" component={ProviderHomeScreen} />
        <Stack.Screen name="AddService" component={AddServiceScreen} />
        <Stack.Screen name="EditService" component={EditServiceScreen} />
        <Stack.Screen name="ProviderProfile" component={ProviderProfileScreen} />
        

      </Stack.Navigator>
    </NavigationContainer>
  );
}