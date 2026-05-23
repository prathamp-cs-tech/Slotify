import {
    View,
    Text,
    StyleSheet,
    FlatList,
    SafeAreaView,
  } from 'react-native';
  
  import { Ionicons } from '@expo/vector-icons';
  
  import MainLayout from '../components/MainLayout';
  
  const NOTIFICATIONS = [
  
    {
      id: '1',
      title: 'Booking Confirmed',
      message: 'Your appointment at The Barber Lounge is confirmed.',
      time: '2 min ago',
      icon: 'checkmark-circle',
      color: '#7C3AED',
    },
  
    {
      id: '2',
      title: 'Booking Reminder',
      message: 'Your salon appointment starts tomorrow at 4:30 PM.',
      time: '1 hr ago',
      icon: 'calendar',
      color: '#2563EB',
    },
  
    {
      id: '3',
      title: 'Special Offer',
      message: 'Glow Studio is offering 20% off this weekend.',
      time: '3 hrs ago',
      icon: 'pricetag',
      color: '#EA580C',
    },
  
  ];
  
  export default function NotificationsScreen({ navigation }) {
  
    const renderItem = ({ item }) => (
  
      <View style={styles.card}>
  
        <View
          style={[
            styles.iconBox,
            { backgroundColor: item.color }
          ]}
        >
  
          <Ionicons
            name={item.icon}
            size={20}
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
  
      </View>
  
    );
  
    return (
  
      <MainLayout navigation={navigation}>
  
        <SafeAreaView style={styles.container}>
  
          <Text style={styles.header}>
            Notifications
          </Text>
  
          <FlatList
            data={NOTIFICATIONS}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 120,
            }}
          />
  
        </SafeAreaView>
  
      </MainLayout>
  
    );
  }
  
  const styles = StyleSheet.create({
  
    container: {
      flex: 1,
      backgroundColor: '#F3F0FF',
      paddingHorizontal: 15,
      margin: 20,
      marginBottom: 0,
    },
  
    header: {
      fontSize: 24,
      fontWeight: '900',
      marginTop: 10,
      marginBottom: 20,
      marginLeft: 5,
    },
  
    card: {
      flexDirection: 'row',
      backgroundColor: '#EDEBFF',
      borderRadius: 18,
      padding: 15,
      marginBottom: 15,
    },
  
    iconBox: {
      width: 48,
      height: 48,
      borderRadius: 14,
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    content: {
      flex: 1,
      marginLeft: 12,
    },
  
    topRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  
    title: {
      fontSize: 14,
      fontWeight: '700',
      color: '#111',
    },
  
    time: {
      fontSize: 11,
      color: '#666',
    },
  
    message: {
      marginTop: 6,
      fontSize: 12,
      color: '#666',
      lineHeight: 18,
      fontWeight: '500',
    },
  
  });