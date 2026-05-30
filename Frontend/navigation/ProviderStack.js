// navigation/ProviderStack.js

import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import ProviderHomeScreen
  from '../screens/ProviderHomeScreen';

import AddServiceScreen
  from '../screens/AddServiceScreen';

import EditServiceScreen
  from '../screens/EditServiceScreen';

import ProviderProfileScreen
  from '../screens/ProviderProfileScreen';

import ProviderBookingsScreen
  from '../screens/ProviderBookingsScreen';

import ProviderNotificationsScreen 
from '../screens/ProviderNotificationsScreen';
import HelpCenterScreen from '../screens/HelpCenterScreen';
import TermsScreen from '../screens/TermsScreen';
import ManageServicesScreen from '../screens/ManageServicesScreen';
import EditSalonDetailsScreen from '../screens/EditSalonDetailsScreen';


const Stack =
  createNativeStackNavigator();

export default function ProviderStack() {

  return (

    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >

      <Stack.Screen
        name="ProviderHome"
        component={ProviderHomeScreen}
      />

      <Stack.Screen
        name="AddService"
        component={AddServiceScreen}
      />

      <Stack.Screen
        name="EditService"
        component={EditServiceScreen}
      />

      <Stack.Screen
        name="ProviderProfile"
        component={
          ProviderProfileScreen
        }
      />

      <Stack.Screen
        name="ProviderBookings"
        component={
          ProviderBookingsScreen
        }
      />

      <Stack.Screen
        name="ProviderNotifications"
        component={
            ProviderNotificationsScreen
        }
      />
      <Stack.Screen
              name="HelpCenter"
              component={HelpCenterScreen}
            />
      
      <Stack.Screen
            name="Terms"
            component={TermsScreen}
        />
    
      <Stack.Screen
            name="ManageServices"
            component={ManageServicesScreen}
      />

      <Stack.Screen
            name="EditSalonDetails"
            component={EditSalonDetailsScreen}
      />
      

      </Stack.Navigator>

  );

}