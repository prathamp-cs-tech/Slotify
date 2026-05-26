import { useState, useCallback } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Linking,
  Animated,
  Easing,
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';

import MainLayout from '../components/MainLayout';
import PrimaryButton from '../components/PrimaryButton';
import SuccessModal from '../components/SuccessModal';

import API from '../services/api';

export default function BookingsScreen({ navigation }) {

  const [activeTab, setActiveTab] = useState('upcoming');
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {

      const fetchBookings = async () => {

        try {

          setLoading(true);

          const response = await API.get('/bookings');

          setBookings(response.data);

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);

        }

      };

      fetchBookings();

    }, [])
  );

  const cancelBooking = async (id) => {

    try {

      await API.put(`/bookings/${id}/cancel`);

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

  const filtered = bookings.filter(
    booking => booking.status === activeTab
  );

  const renderItem = ({ item }) => {

    return (

      <View style={styles.card}>

        <View style={styles.rowBetween}>

          <Text style={styles.salon}>
            {item.salonId?.name}
          </Text>

          <Text style={styles.status(item.status)}>
            {item.status.toUpperCase()}
          </Text>

        </View>

        <Text style={styles.service}>
          {item.salonId?.service}
        </Text>

        <View style={styles.metaRow}>

          <Ionicons
            name="calendar-outline"
            size={14}
          />

          <Text style={styles.metaText}>
            {item.date}
          </Text>

          <Ionicons
            name="time-outline"
            size={14}
            style={{ marginLeft: 10 }}
          />

          <Text style={styles.metaText}>
            {item.time}
          </Text>

        </View>

        {item.status === 'completed' && (

          <View>

            <PrimaryButton
              title="Book Again"
              onPress={() =>
                navigation.navigate('Salon', {
                  salon: item.salonId,
                })
              }
            />

            <Text style={styles.rateText}>
              Rate your experience
            </Text>

            <View style={styles.starsRow}>

              {[1, 2, 3, 4, 5].map((star) => (

                <TouchableOpacity
                  key={star}
                >

                  <Ionicons
                    name="star-outline"
                    size={24}
                    color="#F4B400"
                  />

                </TouchableOpacity>

              ))}

            </View>

          </View>

        )}

        {item.status === 'upcoming' && (

          <>

            <PrimaryButton
              title="Navigate"
              onPress={() =>
                Linking.openURL(
                  'https://maps.google.com/?q=BMS+College+of+Engineering+Bangalore'
                )
              }
            />

            <PrimaryButton
              title="Cancel Booking"
              bordered
              backgroundColor="red"
              textColor="red"
              onPress={() => cancelBooking(item._id)}
            />

          </>

        )}

      </View>

    );

  };

  return (

    <MainLayout navigation={navigation}>

      <View style={styles.container}>

        <Text style={styles.header}>
          My Bookings
        </Text>

        <View style={styles.tabs}>

          {['upcoming', 'completed', 'cancelled'].map(tab => (

            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[
                styles.tab,
                activeTab === tab && styles.activeTab
              ]}
            >

              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText
                ]}
              >
                {tab}
              </Text>

            </TouchableOpacity>

          ))}

        </View>

        {loading && (

          <View style={styles.loadingWrapper}>

            <View style={styles.loaderTrack}>

              <Animated.View style={styles.loaderBar} />

            </View>

          </View>

        )}

        {!loading && filtered.length === 0 && (

          <Text style={styles.emptyText}>
            No bookings found
          </Text>

        )}

        <FlatList
          data={filtered}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 120,
          }}
        />

        <SuccessModal
          visible={showCancelPopup}
          title="Booking Cancelled"
          onClose={() => setShowCancelPopup(false)}
        />

      </View>

    </MainLayout>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F3F0FF',
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  header: {
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 20,
    color: '#111',
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
    backgroundColor: '#EDEBFF',
  },

  activeTab: {
    backgroundColor: '#7C3AED',
  },

  tabText: {
    fontSize: 12,
    color: '#555',
    fontWeight: '500',
    textTransform: 'capitalize',
  },

  activeTabText: {
    color: '#fff',
    fontWeight: '700',
  },

  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 18,
    marginBottom: 15,
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  salon: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111',
  },

  service: {
    color: '#666',
    marginTop: 5,
    fontSize: 13,
  },

  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 6,
  },

  metaText: {
    marginLeft: 5,
    fontSize: 12,
    color: '#555',
  },

  status: (status) => ({
    fontSize: 11,
    fontWeight: '700',
    color:
      status === 'completed'
        ? 'green'
        : status === 'cancelled'
        ? 'red'
        : '#7C3AED',
  }),

  rateText: {
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 8,
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },

  starsRow: {
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
  },

  loadingWrapper: {
    marginTop: 40,
    alignItems: 'center',
  },

  loaderTrack: {
    width: '85%',
    height: 5,
    backgroundColor: '#E9D5FF',
    borderRadius: 10,
    overflow: 'hidden',
  },

  loaderBar: {
    width: '100%',
    height: 5,
    backgroundColor: '#7C3AED',
  },

  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#777',
    fontWeight: '600',
  },

});