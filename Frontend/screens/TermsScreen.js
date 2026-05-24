import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
  } from 'react-native';

  import { SafeAreaView } from 'react-native-safe-area-context';
  
  import { Ionicons } from '@expo/vector-icons';
  
  export default function TermsScreen({ navigation }) {
  
    return (
  
      <SafeAreaView style={styles.container}>
  
        {/* HEADER */}
        <View style={styles.headerRow}>
  
          <TouchableOpacity
            onPress={() => navigation.goBack()}
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color="#111"
            />
          </TouchableOpacity>
  
          <Text style={styles.header}>
            Terms & Privacy
          </Text>
  
          <View style={{ width: 24 }} />
  
        </View>
  
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
  
          <View style={styles.card}>
  
            <Text style={styles.title}>
              Terms of Service
            </Text>
  
            <Text style={styles.text}>
              Slotify helps users discover salons and
              book appointments. Users are responsible
              for providing correct booking information.
            </Text>
  
            <Text style={styles.title}>
              Privacy Policy
            </Text>
  
            <Text style={styles.text}>
              Your personal information and booking
              details are securely stored and never
              shared without permission.
            </Text>
  
            <Text style={styles.title}>
              Booking Policy
            </Text>
  
            <Text style={styles.text}>
              Appointments may be cancelled or
              rescheduled depending on salon policies.
            </Text>
  
          </View>
  
        </ScrollView>
  
      </SafeAreaView>
  
    );
  }
  
  const styles = StyleSheet.create({
  
    container: {
      flex: 1,
      paddingHorizontal: 15,
      margin: 20,
      marginBottom: 0,
    },
  
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 25,
    },
  
    header: {
      fontSize: 24,
      fontWeight: '900',
    },
  
    card: {
      backgroundColor: '#EDEBFF',
      borderRadius: 20,
      padding: 18,
      marginBottom: 40,
    },
  
    title: {
      fontSize: 15,
      fontWeight: '700',
      marginBottom: 10,
      marginTop: 8,
      color: '#111',
    },
  
    text: {
      fontSize: 13,
      lineHeight: 22,
      color: '#555',
      marginBottom: 12,
    },
  
  });