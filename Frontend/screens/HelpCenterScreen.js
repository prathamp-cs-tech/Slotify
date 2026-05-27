import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
  Alert,
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

export default function HelpCenterScreen({
  navigation,
}) {

  const handleCall = async () => {

    const supported =
      await Linking.canOpenURL(
        'tel:+919876543210'
      );

    if (supported) {

      Linking.openURL(
        'tel:+919876543210'
      );

    } else {

      Alert.alert(
        'Error',
        'Calling is not supported'
      );

    }

  };

  const handleWhatsApp =
    async () => {

      const url =
        'https://wa.me/919876543210';

      const supported =
        await Linking.canOpenURL(
          url
        );

      if (supported) {

        Linking.openURL(url);

      } else {

        Alert.alert(
          'Error',
          'WhatsApp not installed'
        );

      }

    };

  const handleEmail =
    async () => {

      const url =
        'mailto:support@slotify.com';

      const supported =
        await Linking.canOpenURL(
          url
        );

      if (supported) {

        Linking.openURL(url);

      } else {

        Alert.alert(
          'Error',
          'Email app not available'
        );

      }

    };

  const faqs = [

    {
      question:
        'How to cancel a booking?',

      answer:
        'Go to My Bookings and tap Cancel Booking.',

    },

    {
      question:
        'How to reschedule an appointment?',

      answer:
        'Cancel the old booking and create a new one.',

    },

    {
      question:
        'How to contact a salon?',

      answer:
        'Open the salon page and use Navigate or WhatsApp.',

    },

    {
      question:
        'How to update my profile?',

      answer:
        'Go to Profile → Edit Profile.',

    },

  ];

  return (

    <SafeAreaView
      style={styles.container}
    >

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 40,
        }}
      >

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
            Help Center
          </Text>

          <View
            style={{
              width: 40,
            }}
          />

        </View>

        <View style={styles.heroCard}>

          <Ionicons
            name="headset"
            size={42}
            color={COLORS.primary}
          />

          <Text style={styles.heroTitle}>
            Need Help?
          </Text>

          <Text style={styles.heroText}>
            Contact support anytime.
          </Text>

        </View>

        <Text style={styles.sectionTitle}>
          Contact Support
        </Text>

        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.9}
          onPress={handleCall}
        >

          <View
            style={[
              styles.iconBox,
              {
                backgroundColor:
                  '#EEE8FF',
              },
            ]}
          >

            <Ionicons
              name="call"
              size={22}
              color={COLORS.primary}
            />

          </View>

          <View style={styles.content}>

            <Text style={styles.title}>
              Call Support
            </Text>

            <Text
              style={styles.subtitle}
            >
              +91 9876543210
            </Text>

          </View>

          <Ionicons
            name="chevron-forward"
            size={20}
            color={
              COLORS.lightGray
            }
          />

        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.9}
          onPress={handleWhatsApp}
        >

          <View
            style={[
              styles.iconBox,
              {
                backgroundColor:
                  '#DCFCE7',
              },
            ]}
          >

            <Ionicons
              name="logo-whatsapp"
              size={22}
              color="#22C55E"
            />

          </View>

          <View style={styles.content}>

            <Text style={styles.title}>
              WhatsApp Support
            </Text>

            <Text
              style={styles.subtitle}
            >
              Chat with support
            </Text>

          </View>

          <Ionicons
            name="chevron-forward"
            size={20}
            color={
              COLORS.lightGray
            }
          />

        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.9}
          onPress={handleEmail}
        >

          <View
            style={[
              styles.iconBox,
              {
                backgroundColor:
                  '#DBEAFE',
              },
            ]}
          >

            <Ionicons
              name="mail"
              size={22}
              color="#2563EB"
            />

          </View>

          <View style={styles.content}>

            <Text style={styles.title}>
              Email Support
            </Text>

            <Text
              style={styles.subtitle}
            >
              support@slotify.com
            </Text>

          </View>

          <Ionicons
            name="chevron-forward"
            size={20}
            color={
              COLORS.lightGray
            }
          />

        </TouchableOpacity>

        <View style={styles.faqCard}>

          <View style={styles.faqHeader}>

            <Ionicons
              name="help-circle"
              size={22}
              color={COLORS.primary}
            />

            <Text style={styles.faqTitle}>
              FAQs
            </Text>

          </View>

          {faqs.map(
            (faq, index) => (

              <View
                key={index}
                style={styles.faqItem}
              >

                <Text
                  style={styles.faqQuestion}
                >
                  {faq.question}
                </Text>

                <Text
                  style={styles.faqAnswer}
                >
                  {faq.answer}
                </Text>

              </View>

            )
          )}

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
    marginBottom: 25,
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
    paddingHorizontal: 24,
    alignItems: 'center',
    marginBottom: 28,
  },

  heroTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.text,
    marginTop: 14,
  },

  heroText: {
    fontSize: 13,
    color: COLORS.gray,
    textAlign: 'center',
    marginTop: 8,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 14,
    marginLeft: 2,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:
      COLORS.white,
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
  },

  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    flex: 1,
    marginLeft: 14,
  },

  title: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
  },

  subtitle: {
    marginTop: 5,
    fontSize: 12,
    color: COLORS.gray,
  },

  faqCard: {
    backgroundColor:
      COLORS.white,
    borderRadius: 24,
    padding: 20,
    marginTop: 10,
  },

  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },

  faqTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.text,
    marginLeft: 10,
  },

  faqItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
  },

  faqQuestion: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 6,
  },

  faqAnswer: {
    fontSize: 12,
    color: COLORS.gray,
    lineHeight: 18,
  },

});