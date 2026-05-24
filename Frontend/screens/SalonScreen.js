import { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import DateTimePicker from '@react-native-community/datetimepicker';

import PrimaryButton from '../components/PrimaryButton';
import SuccessModal from '../components/SuccessModal';

export default function SalonScreen({
  route,
  navigation,
}) {

  const { salon } = route.params;

  const [selectedTime, setSelectedTime] = useState(null);

  const [date, setDate] = useState(new Date());

  const [tempDate, setTempDate] = useState(new Date());

  const [showPicker, setShowPicker] = useState(false);

  const [booked, setBooked] = useState(false);

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

  const handleBooking = () => {

    if (!selectedTime) return;

    setBooked(true);

  };

  const onChangeDate = (
    event,
    selectedDate
  ) => {
    setShowPicker(false);
    if (selectedDate) {
      setTempDate(selectedDate);
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
            source={{ uri: salon.image }}
            style={styles.image}
          />

          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >

            <Ionicons
              name="arrow-back"
              size={20}
            />

          </TouchableOpacity>

        </View>

        {/* CONTENT */}
        <View style={styles.container}>

          {/* TITLE */}
          <View style={styles.titleRow}>

            <Text style={styles.title}>
              {salon.name}
            </Text>

            <View style={styles.rating}>

              <Ionicons
                name="star"
                size={14}
              />

              <Text style={styles.ratingText}>
                {salon.rating}
              </Text>

            </View>

          </View>

          <Text style={styles.desc}>
            {salon.service}
          </Text>

          {/* LOCATION */}
          <TouchableOpacity
            style={styles.locationRow}
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

            <Text style={styles.locationText}>
              BMSCE Bangalore
            </Text>

          </TouchableOpacity>

          {/* DATE */}
          <Text style={styles.section}>
            Date
          </Text>

          <TouchableOpacity
            style={styles.dateBox}
            onPress={() => setShowPicker(true)}
          >

            <Text style={styles.dateText}>
              {date.toDateString()}
            </Text>

          </TouchableOpacity>

          {/* DATE PICKER */}
          {showPicker && (

            <View style={styles.pickerWrapper}>

              <DateTimePicker
                value={tempDate}
                mode="date"
                display="spinner"
                onChange={onChangeDate}
              />

              <TouchableOpacity
                style={styles.tickBtn}
                onPress={() => {
                  setDate(tempDate);
                  setShowPicker(false);
                }}
              >

                <Ionicons
                  name="checkmark"
                  size={24}
                  color="#fff"
                />

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

          {/* CONTACT */}
          <View style={styles.contactRow}>

            {/* CALL */}
            <TouchableOpacity
              style={styles.contactBtn}
              onPress={() =>
                Linking.openURL(
                  'tel:+919036466958'
                )
              }
            >

              <Ionicons
                name="call"
                size={18}
                color="#fff"
              />

              <Text style={styles.contactText}>
                Call
              </Text>

            </TouchableOpacity>

            {/* WHATSAPP */}
            <TouchableOpacity
              style={styles.whatsappBtn}
              onPress={() =>
                Linking.openURL(
                  'https://wa.me/919036466958'
                )
              }
            >

              <Ionicons
                name="logo-whatsapp"
                size={18}
                color="#fff"
              />

              <Text style={styles.contactText}>
                WhatsApp
              </Text>

            </TouchableOpacity>

          </View>

          {/* BILL */}
          <Text style={styles.section}>
            Bill Detail
          </Text>

          <View style={styles.billRow}>

            <Text>
              Service Amount
            </Text>

            <Text style={styles.billAmount}>
              ₹{salon.price}
            </Text>

          </View>

          {/* SUBMIT */}
          <PrimaryButton
            title="Submit"
            onPress={handleBooking}
          />

          <View style={{ height: 20 }} />

        </View>

      </ScrollView>

      {/* SUCCESS MODAL */}
      <SuccessModal
        visible={booked}
        title="Booking Confirmed"
        onClose={() => {
          setBooked(false);
        }}
      />

    </View>

  );
}

const styles = StyleSheet.create({

  screen: {
    flex: 1,
    backgroundColor: '#F3F0FF',
  },

  image: {
    width: '100%',
    height: 220,
  },

  backBtn: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 20,
  },

  container: {
    padding: 20,
  },

  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  title: {
    fontSize: 22,
    fontWeight: '800',
  },

  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  ratingText: {
    marginLeft: 4,
  },

  desc: {
    color: '#777',
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
  },

  dateBox: {
    backgroundColor: '#EDEBFF',
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
  },

  tickBtn: {
    backgroundColor: '#7C3AED',
    padding: 10,
    borderRadius: 20,
    marginTop: 10,
  },

  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  timeBtn: {
    width: '47%',
    padding: 12,
    borderRadius: 20,
    backgroundColor: '#EDEBFF',
    marginBottom: 10,
    alignItems: 'center',
  },

  activeTime: {
    backgroundColor: '#7C3AED',
  },

  activeTimeText: {
    color: '#fff',
  },

  timeText: {
    fontSize: 13,
  },

  contactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 10,
  },

  contactBtn: {
    flex: 1,
    height: 48,
    backgroundColor: '#7C3AED',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 8,
  },

  whatsappBtn: {
    flex: 1,
    height: 48,
    backgroundColor: '#22C55E',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  contactText: {
    color: '#fff',
    fontWeight: '700',
    marginLeft: 8,
  },

  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  billAmount: {
    fontWeight: '600',
  },

});