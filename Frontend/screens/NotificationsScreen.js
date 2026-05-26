import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import MainLayout from '../components/MainLayout';

const notifications = [

  {
    id: '1',
    title: 'Booking Confirmed',
    message:
      'Your appointment at The Barber Lounge is confirmed.',
    time: '2 min ago',
    icon: 'checkmark-done',
    color: '#7C3AED',
  },

  {
    id: '2',
    title: 'Booking Reminder',
    message:
      'Your salon appointment starts tomorrow at 4:30 PM.',
    time: '1 hr ago',
    icon: 'calendar',
    color: '#2563EB',
  },

  {
    id: '3',
    title: 'Special Offer',
    message:
      'Glow Studio is offering 20% off this weekend.',
    time: '3 hrs ago',
    icon: 'pricetag',
    color: '#EA580C',
  },

];

export default function NotificationsScreen({ navigation }) {

  const renderItem = ({ item }) => (

    <TouchableOpacity style={styles.card} activeOpacity={0.8}>

      <View
        style={[
          styles.iconBox,
          {
            backgroundColor: item.color,
          },
        ]}
      >

        <Ionicons
          name={item.icon}
          size={24}
          color="#fff"
        />

      </View>

      <View style={styles.content}>

        <View style={styles.topRow}>

          <Text style={styles.title}>
            {item.title}
          </Text>

          <Text style={styles.time}>
            {item.time}
          </Text>

        </View>

        <Text style={styles.message}>
          {item.message}
        </Text>

      </View>

    </TouchableOpacity>

  );

  return (

    <MainLayout navigation={navigation}>

      <View style={styles.container}>

        <Text style={styles.header}>
          Notifications
        </Text>

        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 120,
          }}
        />

      </View>

    </MainLayout>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F3F0FF',
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  header: {
    fontSize: 32,
    fontWeight: '900',
    color: '#111',
    marginBottom: 24,
  },

  card: {
    backgroundColor: '#ECE7F8',
    borderRadius: 24,
    padding: 18,
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },

  iconBox: {
    width: 70,
    height: 70,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },

  content: {
    flex: 1,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  title: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111',
    flex: 1,
  },
  
  message: {
    fontSize: 13,
    color: '#666',
    lineHeight: 22,
    fontWeight: '500',
  },
  
  time: {
    fontSize: 12,
    color: '#666',
    marginLeft: 10,
  },
  
  card: {
    backgroundColor: '#ECE7F8',
    borderRadius: 22,
    padding: 16,
    flexDirection: 'row',
    marginBottom: 14,
    alignItems: 'flex-start',
  },
  
  iconBox: {
    width: 62,
    height: 62,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  
  header: {
    fontSize: 28,
    fontWeight: '900',
    color: '#111',
    marginBottom: 22,
  },

});