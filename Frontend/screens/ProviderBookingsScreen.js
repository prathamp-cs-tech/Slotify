// screens/ProviderBookingsScreen.js

import {
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Animated,
  Easing,
  Alert,
} from 'react-native';

import {
  useFocusEffect,
} from '@react-navigation/native';

import {
  Ionicons,
} from '@expo/vector-icons';

import PrimaryButton
  from '../components/PrimaryButton';

import SuccessModal
  from '../components/SuccessModal';

import API
  from '../services/api';

import {
  COLORS,
} from '../constants/colors';

import ProviderLayout
  from '../components/ProviderLayout';

export default function ProviderBookingsScreen({
  navigation,
}) {

  const [
    bookings,
    setBookings,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    activeTab,
    setActiveTab,
  ] = useState('upcoming');

  const [
    showCancelPopup,
    setShowCancelPopup,
  ] = useState(false);

  const slideAnim = useRef(
    new Animated.Value(-120)
  ).current;

  useEffect(() => {

    Animated.loop(

      Animated.timing(slideAnim, {

        toValue: 320,

        duration: 1000,

        easing: Easing.linear,

        useNativeDriver: true,

      })

    ).start();

  }, []);

  useFocusEffect(

    useCallback(() => {

      fetchBookings();

    }, [])

  );

  const fetchBookings =
    async () => {

      try {

        setLoading(true);

        const response =
          await API.get(
            '/bookings/provider'
          );

        setBookings(
          response.data
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

  const convertTo24Hour =
    (time) => {

      let [hourMinute, period] =
        time.split(' ');

      let [hours, minutes] =
        hourMinute.split(':');

      hours = parseInt(hours);

      if (
        period.toLowerCase() === 'pm' &&
        hours !== 12
      ) {

        hours += 12;

      }

      if (
        period.toLowerCase() === 'am' &&
        hours === 12
      ) {

        hours = 0;

      }

      return {
        hours,
        minutes:
          parseInt(minutes),
      };

    };

  const canCancelBooking =
    (bookingDate, bookingTime) => {

      const {
        hours,
        minutes,
      } = convertTo24Hour(
        bookingTime
      );

      const bookingDateTime =
        new Date(bookingDate);

      bookingDateTime.setHours(
        hours,
        minutes,
        0,
        0
      );

      const now =
        new Date();

      const differenceHours =
        (bookingDateTime - now) /
        (1000 * 60 * 60);

      return differenceHours >= 3;

    };

  const cancelBooking =
    async (id) => {

      try {

        await API.put(

          `/bookings/${id}/provider-cancel`

        );

        setBookings(prev =>

          prev.map(booking =>

            booking._id === id

              ? {

                  ...booking,

                  status:
                    'cancelled',

                }

              : booking

          )

        );

        setShowCancelPopup(true);

      } catch (error) {

        Alert.alert(

          'Error',

          error.response?.data?.message ||

          'Failed to cancel appointment'

        );

      }

    };

  const filtered =
    bookings.filter(

      booking =>
        booking.status ===
        activeTab

    );

  const formatDate =
    (date) => {

      return new Date(date)
        .toLocaleDateString(
          'en-IN',
          {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          }
        );

    };

  const renderItem = ({
    item,
  }) => {

    return (

      <View style={styles.card}>

        <View style={styles.rowBetween}>

          <Text style={styles.customerName}>
            {item.userId?.name ||
              'Customer'}
          </Text>

          <Text
            style={
              styles.status(
                item.status
              )
            }
          >
            {item.status.toUpperCase()}
          </Text>

        </View>

        <Text style={styles.serviceName}>
          {item.serviceData?.name}
        </Text>

        <Text style={styles.category}>
          {item.serviceData?.category}
        </Text>

        <View style={styles.priceChip}>

          <Text style={styles.priceText}>
            ₹{item.serviceData?.price}
          </Text>

        </View>

        <View style={styles.metaRow}>

          <Ionicons
            name="calendar-outline"
            size={16}
            color={COLORS.gray}
          />

          <Text style={styles.metaText}>
            {formatDate(
              item.bookingDate
            )}
          </Text>

          <Ionicons
            name="time-outline"
            size={16}
            color={COLORS.gray}
            style={{
              marginLeft: 12,
            }}
          />

          <Text style={styles.metaText}>
            {item.bookingTime}
          </Text>

        </View>

        {item.status ===
          'upcoming' && (

          <>

            <PrimaryButton
              title="Cancel Appointment"
              bordered
              backgroundColor={
                COLORS.danger
              }
              textColor={
                COLORS.danger
              }
              disabled={
                !canCancelBooking(
                  item.bookingDate,
                  item.bookingTime
                )
              }
              onPress={() =>
                cancelBooking(
                  item._id
                )
              }
            />

            {!canCancelBooking(
              item.bookingDate,
              item.bookingTime
            ) && (

              <Text
                style={
                  styles.cancelWarning
                }
              >
                Cannot cancel within
                3 hours of slot time
              </Text>

            )}

          </>

        )}

      </View>

    );

  };

  return (

    <ProviderLayout
      navigation={navigation}
      active="calendar"
    >

      <View style={styles.container}>

        <Text style={styles.header}>
          Salon Bookings
        </Text>

        <View style={styles.tabs}>

          {[
            'upcoming',
            'completed',
            'cancelled',
          ].map(tab => (

            <TouchableOpacity
              key={tab}
              onPress={() =>
                setActiveTab(tab)
              }
              style={[

                styles.tab,

                activeTab === tab &&
                styles.activeTab,

              ]}
            >

              <Text
                style={[

                  styles.tabText,

                  activeTab === tab &&
                  styles.activeTabText,

                ]}
              >
                {tab}
              </Text>

            </TouchableOpacity>

          ))}

        </View>

        {loading && (

          <View
            style={
              styles.loadingWrapper
            }
          >

            <View
              style={
                styles.loaderTrack
              }
            >

              <Animated.View
                style={[

                  styles.loaderBar,

                  {
                    transform: [
                      {
                        translateX:
                          slideAnim,
                      },
                    ],
                  },

                ]}
              />

            </View>

          </View>

        )}

        {!loading &&
          filtered.length === 0 && (

          <Text
            style={styles.emptyText}
          >
            No bookings found
          </Text>

        )}

        {!loading && (

          <FlatList

            data={filtered}

            keyExtractor={(item) =>
              item._id
            }

            renderItem={renderItem}

            showsVerticalScrollIndicator={false}

            contentContainerStyle={{
              paddingBottom: 120,
            }}

          />

        )}

        <SuccessModal
          visible={showCancelPopup}
          title="Appointment Cancelled"
          onClose={() =>
            setShowCancelPopup(false)
          }
        />

      </View>

    </ProviderLayout>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor:
      COLORS.background,
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  header: {
    fontSize: 26,
    fontWeight: '900',
    marginBottom: 20,
    color: COLORS.text,
  },

  tabs: {
    flexDirection: 'row',
    marginBottom: 20,
  },

  tab: {
    marginRight: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor:
      COLORS.card,
  },

  activeTab: {
    backgroundColor:
      COLORS.primary,
  },

  tabText: {
    fontSize: 12,
    color: COLORS.gray,
    fontWeight: '600',
    textTransform:
      'capitalize',
  },

  activeTabText: {
    color: COLORS.white,
    fontWeight: '700',
  },

  card: {
    backgroundColor:
      COLORS.white,
    padding: 18,
    borderRadius: 20,
    marginBottom: 16,
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent:
      'space-between',
    alignItems: 'center',
  },

  customerName: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.text,
  },

  serviceName: {
    marginTop: 14,
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },

  category: {
    marginTop: 4,
    color: COLORS.gray,
    fontSize: 13,
    fontWeight: '600',
  },

  priceChip: {
    alignSelf: 'flex-start',
    marginTop: 12,
    backgroundColor:
      '#EDE9FE',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },

  priceText: {
    color: COLORS.primary,
    fontWeight: '800',
    fontSize: 13,
  },

  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
  },

  metaText: {
    marginLeft: 5,
    fontSize: 13,
    color: COLORS.gray,
    fontWeight: '600',
  },

  status: (status) => ({
    fontSize: 11,
    fontWeight: '800',

    color:

      status === 'completed'
        ? 'green'

        : status === 'cancelled'
        ? COLORS.danger

        : COLORS.primary,

  }),

  loadingWrapper: {
    marginTop: 50,
    alignItems: 'center',
  },

  loaderTrack: {
    width: '85%',
    height: 5,
    backgroundColor:
      '#DDD6FE',
    borderRadius: 10,
    overflow: 'hidden',
  },

  loaderBar: {
    width: 120,
    height: 5,
    backgroundColor:
      COLORS.primary,
    borderRadius: 10,
  },

  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: COLORS.gray,
    fontWeight: '600',
  },

  cancelWarning: {
    marginTop: 8,
    color: COLORS.danger,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },

});