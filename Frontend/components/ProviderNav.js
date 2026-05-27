import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
  } from 'react-native';
  
  import {
    Ionicons,
  } from '@expo/vector-icons';
  
  import {
    useRoute,
  } from '@react-navigation/native';
  
  import { COLORS } from '../constants/colors';
  
  export default function ProviderNav({
    navigation,
  }) {
  
    const route = useRoute();
  
    const getActiveTab = () => {
  
      if (route.name === 'ProviderHome') {
        return 'home';
      }
  
      if (route.name === 'Appointments') {
        return 'calendar';
      }
  
      if (route.name === 'ProviderProfile') {
        return 'person';
      }
  
      return '';
  
    };
  
    const activeTab = getActiveTab();
  
    const tabs = [
  
      {
        key: 'home',
        icon: 'home',
        label: 'Home',
      },
  
      {
        key: 'calendar',
        icon: 'calendar',
        label: 'Appointments',
      },
  
      {
        key: 'person',
        icon: 'person',
        label: 'Profile',
      },
  
    ];
  
    const handlePress = (tab) => {
  
      if (tab.key === 'home') {
  
        navigation.navigate(
          'ProviderHome'
        );
  
      }
  
      else if (tab.key === 'calendar') {
  
        navigation.navigate(
          'Appointments'
        );
  
      }
  
      else if (tab.key === 'person') {
  
        navigation.navigate(
          'ProviderProfile'
        );
  
      }
  
    };
  
    return (
  
      <View style={styles.nav}>
  
        {tabs.map((tab) => (
  
          <TouchableOpacity
            key={tab.key}
            style={styles.navItem}
            onPress={() =>
              handlePress(tab)
            }
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
                activeTab === tab.key &&
                styles.activeLabel,
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