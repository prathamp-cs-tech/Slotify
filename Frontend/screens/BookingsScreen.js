import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Linking,
  Modal,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import MainLayout from '../components/MainLayout';
import { SALONS } from '../data/salons';

const BOOKINGS = [
  {
    id: '1',
    salonId: '1',
    service: 'Haircut',
    date: '20 Apr 2026',
    time: '4:30 PM',
    status: 'upcoming',
  },
  {
    id: '2',
    salonId: '2',
    service: 'Facial',
    date: '15 Apr 2026',
    time: '2:00 PM',
    status: 'completed',
  },
  {
    id: '3',
    salonId: '4',
    service: 'Beard Trim',
    date: '10 Apr 2026',
    time: '6:00 PM',
    status: 'cancelled',
  },
];

export default function BookingsScreen({ navigation }) {

  const [activeTab, setActiveTab] = useState('upcoming');
  const [showCancelPopup, setShowCancelPopup] = useState(false);

  const getSalon = (id) => SALONS.find(s => s.id === id);

  const filtered = BOOKINGS.filter(
    booking => booking.status === activeTab
  );

  const renderItem = ({ item }) => {

    const salon = getSalon(item.salonId);

    if (!salon) return null;

    return (

      <View style={styles.card}>

        {/* TOP ROW */}
        <View style={styles.rowBetween}>

          <Text style={styles.salon}>
            {salon.name}
          </Text>

          <Text style={styles.status(item.status)}>
            {item.status.toUpperCase()}
          </Text>

        </View>

        {/* SERVICE */}
        <Text style={styles.service}>
          {item.service}
        </Text>

        {/* DATE + TIME */}
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

        {/* COMPLETED */}
        {item.status === 'completed' && (

          <TouchableOpacity
            style={styles.bookAgainBtn}
            onPress={() =>
              navigation.navigate('Salon', { salon })
            }
          >
            <Text style={styles.bookAgainText}>
              Book Again
            </Text>
          </TouchableOpacity>

        )}

        {/* UPCOMING */}
        {item.status === 'upcoming' && (
          <>

            <TouchableOpacity
              style={styles.navigateBtn}
              onPress={() =>
                Linking.openURL(
                  'https://maps.google.com/?q=BMS+College+of+Engineering+Bangalore'
                )
              }
            >
              <Text style={styles.navigateText}>
                Navigate
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => setShowCancelPopup(true)}
            >
              <Text style={styles.cancelText}>
                Cancel Booking
              </Text>
            </TouchableOpacity>

          </>
        )}

      </View>
    );
  };

  return (

    <MainLayout navigation={navigation}>

      <SafeAreaView style={styles.container}>

        {/* HEADER */}
        <Text style={styles.header}>
          My Bookings
        </Text>

        {/* TABS */}
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

        {/* LIST */}
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 120
          }}
        />

        {/* POPUP */}
        <Modal
          transparent
          visible={showCancelPopup}
          animationType="fade"
        >

          <View style={styles.modalOverlay}>

            <View style={styles.modalBox}>

              <Ionicons
                name="checkmark-circle"
                size={70}
                color="#7C3AED"
              />

              <Text style={styles.modalText}>
                Cancellation Requested
              </Text>

              <TouchableOpacity
                style={styles.okBtn}
                onPress={() => setShowCancelPopup(false)}
              >
                <Text style={styles.okText}>
                  OK
                </Text>
              </TouchableOpacity>

            </View>

          </View>

        </Modal>

      </SafeAreaView>

    </MainLayout>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F3F0FF',
    padding: 20,
  },

  header: {
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 20,
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
  },

  activeTabText: {
    color: '#fff',
    fontWeight: '700',
  },

  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 16,
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

  navigateBtn: {
    marginTop: 12,
    backgroundColor: '#7C3AED',
    padding: 11,
    borderRadius: 22,
    alignItems: 'center',
  },

  navigateText: {
    color: '#fff',
    fontWeight: '600',
  },

  cancelBtn: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'red',
    padding: 11,
    borderRadius: 22,
    alignItems: 'center',
  },

  cancelText: {
    color: 'red',
    fontWeight: '600',
  },

  bookAgainBtn: {
    marginTop: 12,
    backgroundColor: '#7C3AED',
    padding: 11,
    borderRadius: 22,
    alignItems: 'center',
  },

  bookAgainText: {
    color: '#fff',
    fontWeight: '600',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalBox: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    width: '70%',
  },

  modalText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '700',
  },

  okBtn: {
    marginTop: 15,
  },

  okText: {
    color: '#7C3AED',
    fontWeight: '700',
    fontSize: 15,
  },

});