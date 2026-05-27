import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {
  SafeAreaView,
} from 'react-native-safe-area-context';

import {
  Ionicons,
} from '@expo/vector-icons';

import {
  COLORS,
} from '../constants/colors';

export default function TermsScreen({
  navigation,
}) {

  const sections = [

    {
      icon: 'document-text-outline',
      title: 'Terms of Service',
      content:
        'Slotify is a salon appointment and service discovery platform. By using the application, users agree to provide accurate information while creating bookings and accounts. Salon availability, pricing, timings, and services are managed by individual providers and may change without prior notice.',
    },

    {
      icon: 'shield-checkmark-outline',
      title: 'Privacy Policy',
      content:
        'Basic account information such as name, email address, bookings, and favorites may be stored to improve user experience and app functionality. Slotify does not intentionally sell personal user data to third parties. Some data may be securely processed through external services used for authentication, database management, or cloud hosting.',
    },

    {
      icon: 'calendar-outline',
      title: 'Booking Policy',
      content:
        'Appointments can be cancelled or rescheduled depending on salon policies and timing availability. Repeated missed appointments or misuse of the booking system may result in temporary restrictions on account activity.',
    },

    {
      icon: 'cash-outline',
      title: 'Payments & Pricing',
      content:
        'Prices shown inside the application are provided by salons and service providers. Slotify does not guarantee that displayed pricing will always remain accurate. Additional taxes, charges, or updated pricing may apply at the salon location.',
    },

    {
      icon: 'alert-circle-outline',
      title: 'Limitation of Responsibility',
      content:
        'Slotify acts as a booking platform connecting customers with salons and service providers. Service quality, hygiene standards, delays, cancellations, or disputes at physical salon locations are the responsibility of the respective provider.',
    },

    {
      icon: 'refresh-outline',
      title: 'Updates to Policies',
      content:
        'These terms and privacy policies may be updated periodically to improve transparency, comply with regulations, or reflect platform changes. Continued use of the application after updates implies acceptance of revised policies.',
    },

  ];

  return (

    <SafeAreaView
      style={styles.container}
    >

      {/* HEADER */}
      <View style={styles.headerRow}>

        <TouchableOpacity
          style={styles.backBtn}
          onPress={() =>
            navigation.goBack()
          }
        >

          <Ionicons
            name="arrow-back"
            size={22}
            color={COLORS.text}
          />

        </TouchableOpacity>

        <Text style={styles.header}>
          Terms & Privacy
        </Text>

        <View
          style={{
            width: 40,
          }}
        />

      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 40,
        }}
      >

        {/* TOP CARD */}
        <View style={styles.heroCard}>

          <Ionicons
            name="shield-checkmark"
            size={40}
            color={COLORS.primary}
          />

          <Text style={styles.heroTitle}>
            Transparency & User Safety
          </Text>

          <Text style={styles.heroText}>
            Please review these terms carefully before
            using the platform. They explain how
            bookings, privacy, and platform usage are
            handled inside Slotify.
          </Text>

        </View>

        {/* POLICY SECTIONS */}
        {sections.map(
          (item, index) => (

            <View
              key={index}
              style={styles.card}
            >

              <View style={styles.cardHeader}>

                <View
                  style={styles.iconBox}
                >

                  <Ionicons
                    name={item.icon}
                    size={20}
                    color={COLORS.primary}
                  />

                </View>

                <Text
                  style={styles.title}
                >
                  {item.title}
                </Text>

              </View>

              <Text style={styles.text}>
                {item.content}
              </Text>

            </View>

          )
        )}

        {/* FOOTER NOTE */}
        <View style={styles.footerCard}>

          <Ionicons
            name="information-circle-outline"
            size={20}
            color={COLORS.primary}
          />

          <Text style={styles.footerText}>
            If you have questions regarding these
            policies, you can contact support through
            the Help Center section inside the app.
          </Text>

        </View>

      </ScrollView>

    </SafeAreaView>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor:
      COLORS.background,
    paddingHorizontal: 20,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent:
      'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 24,
  },

  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor:
      COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },

  header: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.text,
  },

  heroCard: {
    backgroundColor:
      COLORS.white,
    borderRadius: 24,
    paddingVertical: 28,
    paddingHorizontal: 22,
    alignItems: 'center',
    marginBottom: 24,
  },

  heroTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
    marginTop: 14,
  },

  heroText: {
    fontSize: 13,
    lineHeight: 21,
    color: COLORS.gray,
    textAlign: 'center',
    marginTop: 10,
  },

  card: {
    backgroundColor:
      COLORS.white,
    borderRadius: 22,
    padding: 18,
    marginBottom: 16,
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },

  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#EEE8FF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    flex: 1,
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.text,
    marginLeft: 12,
  },

  text: {
    fontSize: 13,
    lineHeight: 22,
    color: COLORS.gray,
  },

  footerCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor:
      COLORS.white,
    borderRadius: 20,
    padding: 16,
    marginTop: 6,
  },

  footerText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 20,
    color: COLORS.gray,
    marginLeft: 10,
  },

});