import {
  Keyboard,
  TouchableWithoutFeedback,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Linking,
  Animated,
  Easing,
} from 'react-native';

import {
  useState,
  useCallback,
  useRef,
  useEffect,
} from 'react';

import {
  useFocusEffect,
} from '@react-navigation/native';

import {
  Ionicons,
} from '@expo/vector-icons';

import MainLayout from '../components/MainLayout';

import PrimaryButton from '../components/PrimaryButton';

import SuccessModal from '../components/SuccessModal';

import RatingModal from '../components/RatingModal';

import API from '../services/api';

import {
  COLORS,
} from '../constants/colors';

export default function BookingsScreen({
  navigation,
}) {

  const [activeTab,
    setActiveTab] =
      useState('upcoming');

  const [showCancelPopup,
    setShowCancelPopup] =
      useState(false);

  const [bookings,
    setBookings] =
      useState([]);

  const [showRatingModal,
    setShowRatingModal] =
      useState(false);

  const [selectedBooking,
    setSelectedBooking] =
      useState(null);

  const [loading,
    setLoading] =
      useState(true);

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
            '/bookings'
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

  const submitRating =
    async (
      rating,
      review
    ) => {

      try {

        await API.put(

          `/bookings/${selectedBooking._id}/rate`,

          {
            rating,
            review,
          }

        );

        setBookings(prev =>

          prev.map(item =>

            item._id ===
            selectedBooking._id

              ? {

                  ...item,

                  rating,

                  review,

                  isRated: true,

                }

              : item

          )

        );

        setShowRatingModal(false);

        setSelectedBooking(null);

      } catch (error) {

        console.log(error);

      }

    };

  const cancelBooking =
    async (id) => {

      try {

        await API.put(
          `/bookings/${id}/cancel`
        );

        setBookings(prev =>

          prev.map(booking =>

            booking._id === id

              ? {
                  ...booking,
                  status: 'cancelled',
                }

              : booking

          )

        );

        setShowCancelPopup(true);

      } catch (error) {

        console.log(error);

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

      <View style={styles.card} collapsable={false}>

        <View style={styles.rowBetween}>

          <Text style={styles.salon}>
            {item.salonId?.name}
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

        <View style={styles.serviceRow}>

          <View>

            <Text
              style={
                styles.serviceName
              }
            >
              {item.serviceId?.name}
            </Text>

            <Text
              style={
                styles.category
              }
            >
              {item.serviceId?.category}
            </Text>

          </View>

          <View style={styles.priceChip}>

            <Text
              style={
                styles.priceText
              }
            >
              ₹{item.serviceId?.price}
            </Text>

          </View>

        </View>

        <View style={styles.metaRow}>

          <Ionicons
            name="calendar-outline"
            size={14}
            color={COLORS.gray}
          />

          <Text style={styles.metaText}>
            {formatDate(
              item.bookingDate
            )}
          </Text>

          <Ionicons
            name="time-outline"
            size={14}
            color={COLORS.gray}
            style={{
              marginLeft: 10,
            }}
          />

          <Text style={styles.metaText}>
            {item.bookingTime}
          </Text>

        </View>

        {item.status ===
          'completed' && (

          <View>

            <PrimaryButton
              title="Book Again"
              onPress={() =>

                navigation.navigate(
                  'Salon',
                  {
                    salon: {

                      ...item.salonId,

                      serviceData:
                        item.serviceId,

                    },
                  }
                )

              }
              disabled={loading}
            />

            {item.isRated ? (

              <View
                style={
                  styles.ratedContainer
                }
              >

                <Text
                  style={
                    styles.rateText
                  }
                >
                  You Rated
                </Text>

                <View
                  style={
                    styles.starsRow
                  }
                >

                  {[1,2,3,4,5]
                    .map((star) => (

                    <Ionicons

                      key={star}

                      name={
                        star <= item.rating

                          ? 'star'

                          : 'star-outline'
                      }

                      size={24}

                      color="#F59E0B"

                    />

                  ))}

                </View>

              </View>

            ) : (

              <PrimaryButton
                title="Rate Now"
                onPress={() => {

                  setSelectedBooking(
                    item
                  );

                  setShowRatingModal(
                    true
                  );

                }}
                disabled={loading}
              />

            )}

          </View>

        )}

        {item.status ===
          'upcoming' && (

          <>

            <PrimaryButton
              title="Navigate"
              onPress={() =>

                Linking.openURL(

                  item.salonId
                    ?.mapLink ||

                  'https://maps.google.com/?q=Bangalore'

                )

              }
            />

            <PrimaryButton
              title="Cancel Booking"
              bordered
              backgroundColor={
                COLORS.danger
              }
              textColor={
                COLORS.danger
              }
              onPress={() =>
                cancelBooking(
                  item._id
                )
              }
            />

          </>

        )}

      </View>

    );

  };

  return (

    <MainLayout
      navigation={navigation}
    >

      

        <View style={styles.container}>

          <Text style={styles.header}>
            My Bookings
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

              keyboardShouldPersistTaps="handled"

              showsVerticalScrollIndicator={false}

              
              nestedScrollEnabled

              contentContainerStyle={{
                paddingBottom: 120,
              }}

            />

          )}

          <SuccessModal
            visible={showCancelPopup}
            title="Booking Cancelled"
            onClose={() =>
              setShowCancelPopup(false)
            }
          />

        </View>

      

      <RatingModal

        visible={showRatingModal}

        serviceName={
          selectedBooking
            ?.serviceId?.name
        }

        onClose={() => {

          setShowRatingModal(false);

          setSelectedBooking(null);

        }}

        onSubmit={submitRating}

      />

    </MainLayout>

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
    fontSize: 24,
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
    fontWeight: '500',
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
    overflow: 'hidden',
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent:
      'space-between',
    alignItems: 'center',
  },

  salon: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
  },

  serviceRow: {
    marginTop: 14,
    flexDirection: 'row',
    justifyContent:
      'space-between',
    alignItems: 'center',
  },

  serviceName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },

  category: {
    marginTop: 5,
    color: COLORS.gray,
    fontSize: 13,
    fontWeight: '600',
  },

  priceChip: {
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
    marginTop: 14,
    marginBottom: 4,
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

  rateText: {
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 8,
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
  },

  starsRow: {
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
  },

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

  ratedContainer: {
    marginTop: 16,
    alignItems: 'center',
  },

});