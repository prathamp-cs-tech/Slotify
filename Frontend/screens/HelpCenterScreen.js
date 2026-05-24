import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Linking,
  } from 'react-native';
  import { SafeAreaView } from 'react-native-safe-area-context';
  
  import { Ionicons } from '@expo/vector-icons';
  
  export default function HelpCenterScreen({ navigation }) {
  
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
            Help Center
          </Text>
  
          <View style={{ width: 24 }} />
  
        </View>
  
        {/* OPTIONS */}
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            Linking.openURL('tel:+919876543210')
          }
        >
  
          <Ionicons
            name="call"
            size={22}
            color="#7C3AED"
          />
  
          <View style={styles.content}>
  
            <Text style={styles.title}>
              Call Support
            </Text>
  
            <Text style={styles.subtitle}>
              +91 9876543210
            </Text>
  
          </View>
  
        </TouchableOpacity>
  
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            Linking.openURL('https://wa.me/919876543210')
          }
        >
  
          <Ionicons
            name="logo-whatsapp"
            size={22}
            color="#22C55E"
          />
  
          <View style={styles.content}>
  
            <Text style={styles.title}>
              WhatsApp Support
            </Text>
  
            <Text style={styles.subtitle}>
              Chat with support team
            </Text>
  
          </View>
  
        </TouchableOpacity>
  
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            Linking.openURL('mailto:support@slotify.com')
          }
        >
  
          <Ionicons
            name="mail"
            size={22}
            color="#2563EB"
          />
  
          <View style={styles.content}>
  
            <Text style={styles.title}>
              Email Support
            </Text>
  
            <Text style={styles.subtitle}>
              support@slotify.com
            </Text>
  
          </View>
  
        </TouchableOpacity>
  
        <View style={styles.faqCard}>
  
          <Text style={styles.faqTitle}>
            Frequently Asked Questions
          </Text>
  
          <Text style={styles.faqItem}>
            • How to cancel a booking?
          </Text>
  
          <Text style={styles.faqItem}>
            • How to reschedule appointment?
          </Text>
  
          <Text style={styles.faqItem}>
            • How to contact salon?
          </Text>
  
        </View>
  
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
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#EDEBFF',
      borderRadius: 18,
      padding: 16,
      marginBottom: 15,
    },
  
    content: {
      marginLeft: 14,
    },
  
    title: {
      fontSize: 14,
      fontWeight: '700',
      color: '#111',
    },
  
    subtitle: {
      marginTop: 4,
      fontSize: 12,
      color: '#666',
    },
  
    faqCard: {
      backgroundColor: '#EDEBFF',
      borderRadius: 18,
      padding: 18,
      marginTop: 10,
    },
  
    faqTitle: {
      fontSize: 15,
      fontWeight: '700',
      marginBottom: 12,
    },
  
    faqItem: {
      fontSize: 13,
      color: '#555',
      marginBottom: 10,
    },
  
  });