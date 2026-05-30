// screens/SalonScreen.js

import {
  useState,
  useEffect,
} from 'react';

import API from '../services/api';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert,
} from 'react-native';

import {
  Ionicons,
} from '@expo/vector-icons';

import DateTimePicker
  from '@react-native-community/datetimepicker';

import PrimaryButton
  from '../components/PrimaryButton';

import SuccessModal
  from '../components/SuccessModal';

import {
  COLORS,
} from '../constants/colors';

export default function SalonScreen({

  route,
  navigation,

}) {

  const { salon } =
    route.params;

  const service =
    salon.serviceData;

  const [selectedTime,
    setSelectedTime] =
      useState(null);

  const [selectedDate,
    setSelectedDate] =
      useState(new Date());

  const [showPicker,
    setShowPicker] =
      useState(false);

  const [booked,
    setBooked] =
      useState(false);

  const [loading,
    setLoading] =
      useState(false);

  const [slots,
    setSlots] =
      useState([]);

  const [bookedSlots,
    setBookedSlots] =
      useState([]);

  const [blockedSlots,
    setBlockedSlots] =
      useState([]);

  useEffect(() => {

    fetchSlots();

  }, [selectedDate]);

  const formatLocalDate =
    (date) => {

      const year =
        date.getFullYear();

      const month =
        String(
          date.getMonth() + 1
        ).padStart(2, '0');

      const day =
        String(
          date.getDate()
        ).padStart(2, '0');

      return `${year}-${month}-${day}`;

    };

  const fetchSlots =
    async () => {

      try {

        const bookingDate =
          formatLocalDate(
            selectedDate
          );

        const response =
          await API.get(

            `/salons/${salon._id}/service/${service._id}/slots?date=${bookingDate}`

          );

        setSlots(
          response.data
            .availableSlots
        );

        setBookedSlots(
          response.data
            .bookedSlots
        );

        setBlockedSlots(
          response.data
            .blockedSlots
        );

      } catch (error) {

        console.log(error);

      }

    };

  const allSlots = [

    '10:00 am',
    '10:30 am',
    '11:00 am',
    '11:30 am',
    '12:00 pm',
    '12:30 pm',
    '1:00 pm',
    '1:30 pm',
    '4:00 pm',
    '4:30 pm',
    '5:00 pm',
    '5:30 pm',

  ];

  const handleBooking =
    async () => {

      try {

        if (!selectedTime) {

          Alert.alert(
            'Select Slot',
            'Please select a slot'
          );

          return;

        }

        setLoading(true);

        const bookingDate =
          formatLocalDate(
            selectedDate
          );

        await API.post(
          '/bookings',
          {

            salonId:
              salon._id,

            serviceId:
              service._id,

            bookingDate,

            bookingTime:
              selectedTime,

          }
        );

        setBooked(true);

      } catch (error) {

        Alert.alert(
          'Booking Failed',
          JSON.stringify(
            error.response?.data || error.message
          )
        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <View style={styles.screen}>

      <ScrollView
        showsVerticalScrollIndicator={false}
      >

        <View>

          <Image
            source={{
              uri:
                service.image ||
                salon.image,
            }}
            style={styles.image}
          />

          <TouchableOpacity
            style={styles.backBtn}
            onPress={() =>
              navigation.goBack()
            }
          >

            <Ionicons
              name="arrow-back"
              size={20}
            />

          </TouchableOpacity>

        </View>

        <View style={styles.container}>

          <View style={styles.titleRow}>

            <View>

              <Text style={styles.title}>
                {service.name}
              </Text>

              <Text style={styles.salonName}>
                {salon.name}
              </Text>

            </View>

            <View style={styles.rating}>

              <Ionicons
                name="star"
                size={14}
                color="#F59E0B"
              />

              <Text
                style={
                  styles.ratingText
                }
              >
                {service.averageRating
                  ?.toFixed(1) || '0.0'}
              </Text>

            </View>

          </View>

          <View style={styles.priceChip}>

            <Text style={styles.priceText}>
              ₹{service.price}
            </Text>

          </View>

          <TouchableOpacity
            style={
              styles.locationRow
            }
            onPress={() =>
              Linking.openURL(
                salon.mapLink ||
                'https://maps.google.com'
              )
            }
          >

            <Ionicons
              name="location-outline"
              size={18}
            />

            <Text
              style={
                styles.locationText
              }
            >
              {salon.address ||
                'Bangalore'}
            </Text>

          </TouchableOpacity>

          <Text style={styles.section}>
            Date
          </Text>

          <TouchableOpacity
            style={styles.dateBox}
            onPress={() =>
              setShowPicker(true)
            }
          >

            <Text
              style={
                styles.dateText
              }
            >
              {selectedDate.toDateString()}
            </Text>

          </TouchableOpacity>

          {showPicker && (

            <View style={styles.pickerWrapper}>

              <DateTimePicker
                value={
                  selectedDate
                }
                mode="date"
                display="spinner"
                minimumDate={
                  new Date()
                }
                onChange={(
                  event,
                  selected
                ) => {

                  if (selected) {

                    setSelectedDate(
                      selected
                    );

                  }

                }}
              />

              <TouchableOpacity
                style={styles.doneBtn}
                onPress={() =>
                  setShowPicker(false)
                }
              >

                <Text style={styles.doneText}>
                  Done
                </Text>

              </TouchableOpacity>

            </View>

          )}

          <Text style={styles.section}>
            Available Slots
          </Text>

          <View style={styles.timeGrid}>

            {allSlots.map((slot) => {

              const isBooked =
                bookedSlots.includes(
                  slot
                );

              const isBlocked =
                blockedSlots.includes(
                  slot
                );

              const isAvailable =
                slots.includes(
                  slot
                );

              const isDisabled =
                !isAvailable;

              return (

                <TouchableOpacity

                  key={slot}

                  disabled={
                    isDisabled
                  }

                  style={[

                    styles.timeBtn,

                    selectedTime ===
                      slot &&
                      styles.activeTime,

                    isBooked &&
                      styles.bookedSlot,

                    isBlocked &&
                      styles.blockedSlot,

                    isDisabled &&
                      styles.disabledSlot,

                  ]}

                  onPress={() =>
                    setSelectedTime(
                      slot
                    )
                  }
                >

                  <Text
                    style={[

                      styles.timeText,

                      selectedTime ===
                        slot &&
                        styles.activeTimeText,

                      isDisabled &&
                        styles.disabledText,

                    ]}
                  >
                    {slot}
                  </Text>

                </TouchableOpacity>

              );

            })}

          </View>

          <View style={styles.legendRow}>

            <View
              style={styles.legendItem}
            >

              <View
                style={[
                  styles.legendColor,
                  {
                    backgroundColor:
                      '#D1D5DB',
                  },
                ]}
              />

              <Text>
                Booked
              </Text>

            </View>

            <View
              style={styles.legendItem}
            >

              <View
                style={[
                  styles.legendColor,
                  {
                    backgroundColor:
                      '#FCA5A5',
                  },
                ]}
              />

              <Text>
                Blocked
              </Text>

            </View>

          </View>

          <PrimaryButton
            title={
              loading
                ? 'BOOKING...'
                : 'Book Appointment'
            }
            onPress={
              handleBooking
            }
          />

          <View
            style={{
              height: 20,
            }}
          />

        </View>

      </ScrollView>

      <SuccessModal
        visible={booked}
        title="Booking Confirmed"
        onClose={() => {

          setBooked(false);

          navigation.navigate(
            'Bookings'
          );

        }}
      />

    </View>

  );

}

const styles = StyleSheet.create({

  screen: {
    flex: 1,
    backgroundColor:
      COLORS.background,
  },

  image: {
    width: '100%',
    height: 240,
  },

  backBtn: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor:
      COLORS.white,
    padding: 8,
    borderRadius: 20,
  },

  container: {
    padding: 20,
  },

  titleRow: {
    flexDirection: 'row',
    justifyContent:
      'space-between',
    alignItems: 'center',
  },

  title: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.text,
  },

  salonName: {
    marginTop: 5,
    color: COLORS.gray,
  },

  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  ratingText: {
    marginLeft: 5,
    fontWeight: '700',
  },

  priceChip: {
    alignSelf: 'flex-start',
    backgroundColor:
      COLORS.card,
    marginTop: 14,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },

  priceText: {
    fontWeight: '800',
    color: COLORS.primary,
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },

  locationText: {
    marginLeft: 8,
    fontWeight: '600',
  },

  section: {
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 10,
    color: COLORS.text,
  },

  dateBox: {
    backgroundColor:
      COLORS.card,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },

  dateText: {
    fontWeight: '700',
  },

  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent:
      'space-between',
    marginBottom: 20,
  },

  timeBtn: {
    width: '47%',
    paddingVertical: 14,
    borderRadius: 18,
    backgroundColor:
      '#EDE9FE',
    marginBottom: 12,
    alignItems: 'center',
  },

  activeTime: {
    backgroundColor:
      COLORS.primary,
  },

  activeTimeText: {
    color: COLORS.white,
    fontWeight: '700',
  },

  bookedSlot: {
    backgroundColor:
      '#D1D5DB',
  },

  blockedSlot: {
    backgroundColor:
      '#FCA5A5',
  },

  disabledSlot: {
    opacity: 0.45,
  },

  disabledText: {
    color: '#6B7280',
  },

  timeText: {
    fontWeight: '600',
    color: COLORS.text,
  },

  legendRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },

  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },

  legendColor: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 6,
  },

  pickerWrapper: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 20,
    paddingVertical: 10,
    marginBottom: 20,
  },

  doneBtn: {
    marginTop: 10,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 28,
    paddingVertical: 10,
    borderRadius: 20,
  },

  doneText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 14,
  },

});