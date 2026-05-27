import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
} from 'react-native';

import {
  Ionicons,
} from '@expo/vector-icons';

import {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  Animated,
  Easing,
} from 'react-native';

import ProviderLayout from '../components/ProviderLayout';

import ProviderCard from '../components/ProviderCard';

import API from '../services/api';

import { COLORS } from '../constants/colors';

export default function ProviderHomeScreen({
  navigation,
}) {

  const [services, setServices] = useState([]);

  const [loading, setLoading] = useState(true);

  const slideAnim = useRef(
    new Animated.Value(-120)
  ).current;

  useEffect(() => {

    const animation = Animated.loop(

      Animated.timing(slideAnim, {

        toValue: 320,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,

      })

    );

    animation.start();

    return () => {
      animation.stop();
    };

  }, []);

  useEffect(() => {

    const fetchServices = async () => {

      try {

        const response = await API.get('/salons');

        setServices(response.data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

    fetchServices();

  }, []);

  return (

    <ProviderLayout navigation={navigation} active="home">

      <View style={styles.safe}>

        <StatusBar
          barStyle="dark-content"
          backgroundColor={COLORS.background}
        />

        <View style={styles.header}>

          <View>

            <Text style={styles.brand}>
              SLOTIFY
            </Text>

            <Text style={styles.subTitle}>
              Provider Dashboard
            </Text>

          </View>

          <TouchableOpacity
            style={styles.notificationBtn}
          >

            <Ionicons
              name="notifications-outline"
              size={22}
              color={COLORS.text}
            />

          </TouchableOpacity>

        </View>

        <View style={styles.statsRow}>

          <View style={styles.statCard}>

            <Text style={styles.statNumber}>
              {services.length}
            </Text>

            <Text style={styles.statLabel}>
              Services
            </Text>

          </View>

          <View style={styles.statCard}>

            <Text style={styles.statNumber}>
              124
            </Text>

            <Text style={styles.statLabel}>
              Bookings
            </Text>

          </View>

          <View style={styles.statCard}>

            <Text style={styles.statNumber}>
              4.8
            </Text>

            <Text style={styles.statLabel}>
              Rating
            </Text>

          </View>

        </View>

        <View style={styles.titleRow}>

          <Text style={styles.sectionTitle}>
            Your Services
          </Text>

        </View>
        <TouchableOpacity
          style={styles.addServiceBtn}
          onPress={() =>
            navigation.navigate('AddService')
          }
        >

          <Ionicons
            name="add"
            size={20}
            color={COLORS.white}
          />

          <Text style={styles.addServiceText}>
            Add New Service
          </Text>

        </TouchableOpacity>

        <ScrollView
          showsVerticalScrollIndicator={false}
        >

          {loading ? (

            <View style={styles.loaderWrapper}>

              <View style={styles.loaderTrack}>

                <Animated.View
                  style={[
                    styles.loaderBar,
                    {
                      transform: [
                        {
                          translateX: slideAnim,
                        },
                      ],
                    },
                  ]}
                />

              </View>

            </View>

          ) : services.length === 0 ? (

            <View style={styles.emptyContainer}>

              <Ionicons
                name="cut-outline"
                size={70}
                color="#C4B5FD"
              />

              <Text style={styles.emptyTitle}>
                No Services Yet
              </Text>

              <Text style={styles.emptyText}>
                Add your first salon service to start receiving bookings
              </Text>

            </View>

          ) : (

            <View style={styles.grid}>

              {services.map((salon) => (

                <ProviderCard
                  key={salon._id}
                  salon={salon}
                  navigation={navigation}
                />

              ))}

            </View>

          )}

          <View style={{ height: 120 }} />

        </ScrollView>

        

      </View>

    </ProviderLayout>

  );

}

const styles = StyleSheet.create({

  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 8,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
  },

  brand: {
    fontSize: 26,
    fontWeight: '900',
    color: COLORS.primary,
    letterSpacing: 2,
  },

  subTitle: {
    marginTop: 2,
    fontSize: 13,
    color: COLORS.gray,
    fontWeight: '600',
  },

  notificationBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 24,
  },

  statCard: {
    width: '31%',
    backgroundColor: COLORS.card,
    borderRadius: 18,
    paddingVertical: 18,
    alignItems: 'center',
  },

  statNumber: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.primary,
  },

  statLabel: {
    marginTop: 5,
    fontSize: 12,
    color: COLORS.gray,
    fontWeight: '600',
  },

  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
  },

  grid: {
    paddingHorizontal: 16,
  },

  loaderWrapper: {
    marginTop: 50,
    alignItems: 'center',
  },

  loaderTrack: {
    width: '85%',
    height: 5,
    backgroundColor: '#DDD6FE',
    borderRadius: 10,
    overflow: 'hidden',
  },

  loaderBar: {
    width: 120,
    height: 5,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
  },

  emptyContainer: {
    marginTop: 100,
    alignItems: 'center',
    paddingHorizontal: 30,
  },

  emptyTitle: {
    marginTop: 18,
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.text,
  },

  emptyText: {
    marginTop: 8,
    fontSize: 14,
    color: COLORS.gray,
    textAlign: 'center',
    lineHeight: 22,
  },
  addServiceBtn: {
    marginHorizontal: 20,
    marginBottom: 22,
    backgroundColor: COLORS.primary,
    borderRadius: 18,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  addServiceText: {
    marginLeft: 8,
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '700',
  },

});