import { useState } from 'react';

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

  const times = [

    '10:00 am',
    '10:30 am',
    '12:00 pm',
    '12:30 pm',
    '4:00 pm',
    '4:30 pm',
    '5:00 pm',
    '5:30 pm',

  ];

  const onChangeDate = (
    event,
    selected
  ) => {

    if (selected) {

      setSelectedDate(selected);

    }

  };

  const handleBooking =
    async () => {

      try {

        if (!selectedTime) {

          Alert.alert(
            'Select Time',
            'Please select a booking time'
          );

          return;

        }

        setLoading(true);

        const bookingDate =
          new Date(selectedDate);

        const time =
          selectedTime.toLowerCase();

        let hours =
          parseInt(
            time.split(':')[0]
          );

        const minutePart =
          time.split(':')[1];

        const minutes =
          parseInt(
            minutePart
          );

        if (
          time.includes('pm') &&
          hours !== 12
        ) {

          hours += 12;

        }

        if (
          time.includes('am') &&
          hours === 12
        ) {

          hours = 0;

        }

        bookingDate.setHours(hours);

        bookingDate.setMinutes(minutes);

        bookingDate.setSeconds(0);

        const response =
          await API.post(
            '/bookings',
            {
              salonId: salon._id,
              bookingDate,
            }
          );

        console.log(
          'BOOKED:',
          response.data
        );

        setBooked(true);

      } catch (error) {

        console.log(
          error.response?.data || error
        );

        Alert.alert(
          'Booking Failed',
          error.response?.data?.message ||
          'Something went wrong'
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

        {/* IMAGE */}
        <View>

          <Image
            source={{
              uri: salon.image,
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

        {/* CONTENT */}
        <View style={styles.container}>

          <View style={styles.titleRow}>

            <Text style={styles.title}>
              {salon.name}
            </Text>

            <View style={styles.rating}>

              <Ionicons
                name="star"
                size={14}
                color={
                  COLORS.warning
                }
              />

              <Text
                style={
                  styles.ratingText
                }
              >
                {salon.rating}
              </Text>

            </View>

          </View>

          <Text style={styles.desc}>
            {salon.service}
          </Text>

          {/* LOCATION */}
          <TouchableOpacity
            style={
              styles.locationRow
            }
            onPress={() =>
              Linking.openURL(
                'https://maps.google.com/?q=BMS+College+of+Engineering+Bangalore'
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
              BMSCE Bangalore
            </Text>

          </TouchableOpacity>

          {/* DATE */}
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

          {/* DATE PICKER */}
          {showPicker && (

            <View style={styles.pickerWrapper}>

              <DateTimePicker
                value={selectedDate}
                mode="date"
                display="spinner"
                minimumDate={new Date()}
                onChange={onChangeDate}
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

          {/* TIMES */}
          <Text style={styles.section}>
            Available times
          </Text>

          <View style={styles.timeGrid}>

            {times.map((t) => (

              <TouchableOpacity
                key={t}
                style={[
                  styles.timeBtn,

                  selectedTime === t &&
                  styles.activeTime,
                ]}
                onPress={() =>
                  setSelectedTime(t)
                }
              >

                <Text
                  style={[
                    styles.timeText,

                    selectedTime === t &&
                    styles.activeTimeText,
                  ]}
                >
                  {t}
                </Text>

              </TouchableOpacity>

            ))}

          </View>

          {/* BILL */}
          <Text style={styles.section}>
            Bill Detail
          </Text>

          <View style={styles.billRow}>

            <Text>
              Service Amount
            </Text>

            <Text
              style={
                styles.billAmount
              }
            >
              ₹{salon.price}
            </Text>

          </View>

          {/* BOOK BUTTON */}
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

      {/* SUCCESS MODAL */}
      <SuccessModal
        visible={booked}
        title="Booking Confirmed"
        onClose={() => {

          setBooked(false);

          navigation.navigate('Home');

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
    height: 220,
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
  },

  title: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.text,
  },

  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  ratingText: {
    marginLeft: 4,
  },

  desc: {
    color: COLORS.gray,
    marginBottom: 15,
    fontSize: 14,
    fontWeight: '500',
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  locationText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
  },

  section: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 10,
    color: COLORS.text,
  },

  dateBox: {
    backgroundColor:
      COLORS.card,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },

  dateText: {
    fontWeight: '600',
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

  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent:
      'space-between',
  },

  timeBtn: {
    width: '47%',
    padding: 12,
    borderRadius: 20,
    backgroundColor:
      COLORS.card,
    marginBottom: 10,
    alignItems: 'center',
  },

  activeTime: {
    backgroundColor:
      COLORS.primary,
  },

  activeTimeText: {
    color: COLORS.white,
  },

  timeText: {
    fontSize: 13,
  },

  billRow: {
    flexDirection: 'row',
    justifyContent:
      'space-between',
    marginBottom: 20,
    marginTop: 10,
  },

  billAmount: {
    fontWeight: '700',
    color: COLORS.primary,
  },

});