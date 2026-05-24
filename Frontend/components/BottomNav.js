import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { COLORS } from '../constants/colors';

export default function BottomNav({ navigation }) {

  const route = useRoute();

  const getActiveTab = () => {
    if (route.name === 'Home') return 'home';
    if (route.name === 'Bookings') return 'calendar';
    if (route.name === 'Notifications') return 'notifications';
    if (route.name === 'Profile') return 'person';

    return '';
  };

  const activeTab = getActiveTab();

  const tabs = [
    { key: 'home', icon: 'home', label: 'Home' },
    { key: 'calendar', icon: 'calendar', label: 'Bookings' },
    {
      key: 'notifications',
      icon: 'notifications',
      label: 'Updates',
    },
    { key: 'person', icon: 'person', label: 'Profile' },
  ];

  const handlePress = (tab) => {
    if (tab.key === 'home') navigation.navigate('Home');
    else if (tab.key === 'calendar') navigation.navigate('Bookings');
    else if (tab.key === 'notifications') navigation.navigate('Notifications');
    else if (tab.key === 'person') navigation.navigate('Profile');
  };

  return (
    <View style={styles.nav}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          style={styles.navItem}
          onPress={() => handlePress(tab)}
        >
          <Ionicons
            name={
              activeTab === tab.key
                ? tab.icon
                : `${tab.icon}-outline`
            }
            size={24}
            color={
              activeTab === tab.key
                ? COLORS.primary
                : COLORS.lightGray
            }
          />

          <Text
            style={[
              styles.navLabel,
              activeTab === tab.key && styles.activeLabel,
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    paddingTop: 10,
    height: 80,
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 10,
  },

  navItem: {
    alignItems: 'center',
  },

  navLabel: {
    fontSize: 10,
    marginTop: 3,
    color: COLORS.lightGray,
  },

  activeLabel: {
    color: COLORS.primary,
    fontWeight: '700',
  },
});