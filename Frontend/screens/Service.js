import { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Switch,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';

import { Ionicons } from '@expo/vector-icons';

import PrimaryButton from '../components/PrimaryButton';

export default function ManageServiceScreen({
  route,
  navigation,
}) {

  const { salon } = route.params;

  const [date, setDate] = useState(new Date());

  const [showPicker, setShowPicker] =
    useState(false);

  const [blockedTimes, setBlockedTimes] =
    useState([]);

  const [name, setName] = useState(
    salon.name
  );

  const [service, setService] = useState(
    salon.service
  );

  const [price, setPrice] = useState(
    salon.price.toString()
  );

  const [location, setLocation] =
    useState('BMSCE Bangalore');

  const [phone, setPhone] = useState(
    '+91 9036466958'
  );

  const [whatsapp, setWhatsapp] =
    useState('+91 9036466958');

  const [available, setAvailable] =
    useState(true);

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

  const toggleBlockedTime = (time) => {

    if (blockedTimes.includes(time)) {

      setBlockedTimes(
        blockedTimes.filter(
          t => t !== time
        )
      );

    } else {

      setBlockedTimes([
        ...blockedTimes,
        time,
      ]);

    }

  };

  const onChangeDate = (
    event,
    selectedDate
  ) => {

    setShowPicker(false);

    if (selectedDate) {
      setDate(selectedDate);
    }

  };

  return (

    <SafeAreaView style={styles.safe}>

      <ScrollView
        showsVerticalScrollIndicator={false}
      >

        {/* IMAGE */}
        <View style={styles.imageWrapper}>

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
              size={22}
              color="#111"
            />

          </TouchableOpacity>

          <TouchableOpacity
            style={styles.editImageBtn}
          >

            <Ionicons
              name="camera-outline"
              size={18}
              color="#fff"
            />

            <Text style={styles.editImageText}>
              Change Photo
            </Text>

          </TouchableOpacity>

        </View>

        {/* CONTENT */}
        <View style={styles.container}>

          {/* TITLE */}
          <View style={styles.titleRow}>

            <Text style={styles.pageTitle}>
              Manage Service
            </Text>

            <View style={styles.activeRow}>

              <Text style={styles.activeText}>
                Active
              </Text>

              <Switch
                value={available}
                onValueChange={setAvailable}
              />

            </View>

          </View>

          {/* NAME */}
          <Text style={styles.label}>
            Service Name
          </Text>

          <View style={styles.inputBox}>

            <Ionicons
              name="cut-outline"
              size={18}
              color="#777"
            />

            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
            />

          </View>

          {/* CATEGORY */}
          <Text style={styles.label}>
            Category
          </Text>

          <View style={styles.inputBox}>

            <Ionicons
              name="grid-outline"
              size={18}
              color="#777"
            />

            <TextInput
              style={styles.input}
              value={service}
              onChangeText={setService}
            />

          </View>

          {/* PRICE */}
          <Text style={styles.label}>
            Price
          </Text>

          <View style={styles.inputBox}>

            <Ionicons
              name="cash-outline"
              size={18}
              color="#777"
            />

            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={price}
              onChangeText={setPrice}
            />

          </View>

          {/* LOCATION */}
          <Text style={styles.label}>
            Location
          </Text>

          <View style={styles.inputBox}>

            <Ionicons
              name="location-outline"
              size={18}
              color="#777"
            />

            <TextInput
              style={styles.input}
              value={location}
              onChangeText={setLocation}
            />

          </View>

          {/* PHONE */}
          <Text style={styles.label}>
            Call Number
          </Text>

          <View style={styles.inputBox}>

            <Ionicons
              name="call-outline"
              size={18}
              color="#777"
            />

            <TextInput
              style={styles.input}
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />

          </View>

          {/* WHATSAPP */}
          <Text style={styles.label}>
            WhatsApp Number
          </Text>

          <View style={styles.inputBox}>

            <Ionicons
              name="logo-whatsapp"
              size={18}
              color="#777"
            />

            <TextInput
              style={styles.input}
              keyboardType="phone-pad"
              value={whatsapp}
              onChangeText={setWhatsapp}
            />

          </View>
          
          {/* DATE */}
          <Text style={styles.label}>
            Block Date
          </Text>

          <TouchableOpacity
            style={styles.inputBox}
            onPress={() => setShowPicker(true)}
          >

            <Ionicons
              name="calendar-outline"
              size={18}
              color="#777"
            />

            <Text style={styles.dateText}>
              {date.toDateString()}
            </Text>

          </TouchableOpacity>

          {showPicker && (

            <DateTimePicker
              value={date}
              mode="date"
              display="spinner"
              onChange={onChangeDate}
            />

          )}

          {/* BLOCKED TIMES */}
          <Text style={styles.label}>
            Blocked Time Slots
          </Text>

          <View style={styles.timesContainer}>

            {times.map((time) => {

              const blocked =
                blockedTimes.includes(time);

              return (

                <TouchableOpacity
                  key={time}
                  style={[
                    styles.timeChip,
                    blocked &&
                      styles.blockedChip,
                  ]}
                  onPress={() =>
                    toggleBlockedTime(time)
                  }
                >

                  <Text
                    style={[
                      styles.timeText,
                      blocked &&
                        styles.blockedText,
                    ]}
                  >
                    {time}
                  </Text>

                </TouchableOpacity>

              );

            })}

          </View>

          {/* TIMES */}
          <Text style={styles.label}>
            Available Times
          </Text>

          <View style={styles.timesContainer}>

            {times.map((time) => (

              <View
                key={time}
                style={styles.timeChip}
              >

                <Text style={styles.timeText}>
                  {time}
                </Text>

              </View>

            ))}

          </View>

          {/* SAVE */}
          <PrimaryButton
            title="Save Changes"
            onPress={() => navigation.goBack()}
          />

          <View style={{ height: 40 }} />

        </View>

      </ScrollView>

    </SafeAreaView>

  );
}

const styles = StyleSheet.create({

  safe: {
    flex: 1,
    backgroundColor: '#F7F5FF',
  },

  imageWrapper: {
    position: 'relative',
  },

  image: {
    width: '100%',
    height: 240,
  },

  backBtn: {
    position: 'absolute',
    top: 55,
    left: 20,

    width: 40,
    height: 40,
    borderRadius: 20,

    backgroundColor: '#fff',

    justifyContent: 'center',
    alignItems: 'center',
  },

  editImageBtn: {
    position: 'absolute',
    bottom: 18,
    right: 18,

    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: '#7C3AED',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 30,
  },

  editImageText: {
    color: '#fff',
    fontWeight: '700',
    marginLeft: 6,
  },

  container: {
    padding: 20,
  },

  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },

  pageTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#111',
  },

  activeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  activeText: {
    marginRight: 8,
    fontWeight: '600',
    color: '#555',
  },

  label: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 10,
    color: '#444',
  },

  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: '#EDEBFF',

    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 15,

    marginBottom: 18,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: '#111',
  },

  timesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 28,
  },

  timeChip: {
    backgroundColor: '#EDE9FE',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 30,
    marginRight: 10,
    marginBottom: 10,
  },

  timeText: {
    color: '#6D28D9',
    fontWeight: '700',
  },

});