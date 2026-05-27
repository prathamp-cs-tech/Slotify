import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
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

  const supportOptions = [

    {
      icon: 'call',
      iconColor: COLORS.primary,
      title: 'Call Support',
      subtitle: '+91 9876543210',
      action: () =>
        Linking.openURL(
          'tel:+919876543210'
        ),
    },

    {
      icon: 'logo-whatsapp',
      iconColor: '#22C55E',
      title: 'WhatsApp Support',
      subtitle:
        'Chat instantly with support',
      action: () =>
        Linking.openURL(
          'https://wa.me/919876543210'
        ),
    },

    {
      icon: 'mail',
      iconColor: '#2563EB',
      title: 'Email Support',
      subtitle:
        'support@slotify.com',
      action: () =>
        Linking.openURL(
          'mailto:support@slotify.com'
        ),
    },

  ];

  const faqs = [

    'How to cancel a booking?',

    'How to reschedule an appointment?',

    'How to contact a salon?',

    'How to request a refund?',

    'How to update my profile?',

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
            Help Center
          </Text>

          <View
            style={{
              width: 40,
            }}
          />

        </View>

        {/* HERO */}
        <View style={styles.heroCard}>

          <Ionicons
            name="headset"
            size={42}
            color={COLORS.primary}
          />

          <Text style={styles.heroTitle}>
            How can we help you?
          </Text>

          <Text style={styles.heroText}>
            Our support team is here
            to assist you anytime.
          </Text>

        </View>

        {/* SUPPORT OPTIONS */}
        <Text style={styles.sectionTitle}>
          Contact Support
        </Text>

        {supportOptions.map(
          (item, index) => (

            <TouchableOpacity
              key={index}
              style={styles.card}
              activeOpacity={0.9}
              onPress={item.action}
            >

              <View
                style={[
                  styles.iconBox,
                  {
                    backgroundColor:
                      `${item.iconColor}15`,
                  },
                ]}
              >

                <Ionicons
                  name={item.icon}
                  size={22}
                  color={item.iconColor}
                />

              </View>

              <View style={styles.content}>

                <Text style={styles.title}>
                  {item.title}
                </Text>

                <Text
                  style={styles.subtitle}
                >
                  {item.subtitle}
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

          )
        )}

        {/* FAQ */}
        <View style={styles.faqCard}>

          <View style={styles.faqHeader}>

            <Ionicons
              name="help-circle"
              size={22}
              color={COLORS.primary}
            />

            <Text style={styles.faqTitle}>
              Frequently Asked Questions
            </Text>

          </View>

          {faqs.map(
            (faq, index) => (

              <TouchableOpacity
                key={index}
                style={styles.faqItem}
              >

                <Text
                  style={styles.faqText}
                >
                  {faq}
                </Text>

                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color={
                    COLORS.lightGray
                  }
                />

              </TouchableOpacity>

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
    lineHeight: 20,
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
    flexDirection: 'row',
    justifyContent:
      'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
  },

  faqText: {
    fontSize: 13,
    color: COLORS.text,
    fontWeight: '500',
  },

});