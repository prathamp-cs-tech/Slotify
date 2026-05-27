// screens/ProviderHomeScreen.js

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  Animated,
  Easing,
} from 'react-native';

import {
  Ionicons,
} from '@expo/vector-icons';

import {
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';

import {
  useFocusEffect,
} from '@react-navigation/native';

import ProviderLayout
  from '../components/ProviderLayout';

import ProviderCard
  from '../components/ProviderCard';

import API from '../services/api';

import {
  COLORS,
} from '../constants/colors';

export default function ProviderHomeScreen({
  navigation,
}) {

  const [salon, setSalon] =
    useState(null);

  const [services, setServices] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

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

  useFocusEffect(

    useCallback(() => {

      fetchSalon();

    }, [])

  );

  const fetchSalon = async () => {

    try {

      setLoading(true);

      const response =
        await API.get(
          '/provider/my-salon'
        );

      setSalon(response.data);

      setServices(
        response.data?.services || []
      );

    } catch (error) {

      console.log(
        error.response?.data || error
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <ProviderLayout
      navigation={navigation}
      active="home"
    >

      <View style={styles.safe}>

        <StatusBar
          barStyle="dark-content"
          backgroundColor={
            COLORS.background
          }
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
            style={
              styles.notificationBtn
            }
          >

            <Ionicons
              name="notifications-outline"
              size={22}
              color={COLORS.text}
            />

          </TouchableOpacity>

        </View>

        {salon && (

          <View style={styles.salonCard}>

            <Text style={styles.salonName}>
              {salon.name}
            </Text>

            <Text style={styles.salonInfo}>
              {salon.address ||
                'Bangalore'}
            </Text>

          </View>

        )}

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

              {
                services.filter(
                  service =>
                    service.isActive
                ).length
              }

            </Text>

            <Text style={styles.statLabel}>
              Active
            </Text>

          </View>

          <View style={styles.statCard}>

            <Text style={styles.statNumber}>

              {services.length > 0

                ? (
                    services.reduce(

                      (sum, service) =>

                        sum +
                        (service.averageRating || 0),

                      0

                    ) / services.length

                  ).toFixed(1)

                : '0.0'}

            </Text>

            <Text style={styles.statLabel}>
              Rating
            </Text>

          </View>

        </View>

        <TouchableOpacity

          style={styles.addServiceBtn}

          onPress={() =>

            navigation.navigate(
              'AddService'
            )

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

        <Text style={styles.sectionTitle}>
          Your Services
        </Text>

        <ScrollView
          showsVerticalScrollIndicator={false}
        >

          {loading ? (

            <View
              style={
                styles.loaderWrapper
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

          ) : services.length === 0 ? (

            <View
              style={
                styles.emptyContainer
              }
            >

              <Ionicons
                name="cut-outline"
                size={70}
                color="#C4B5FD"
              />

              <Text
                style={
                  styles.emptyTitle
                }
              >
                No Services Yet
              </Text>

            </View>

          ) : (

            <View style={styles.grid}>

              {services.map(
                (service) => (

                  <ProviderCard

                    key={service._id}

                    salon={salon}

                    service={service}

                    navigation={
                      navigation
                    }

                  />

                )
              )}

            </View>

          )}

          <View
            style={{ height: 120 }}
          />

        </ScrollView>

      </View>

    </ProviderLayout>

  );

}

const styles = StyleSheet.create({

  safe: {
    flex: 1,
    backgroundColor:
      COLORS.background,
    paddingTop: 8,
  },

  header: {
    flexDirection: 'row',
    justifyContent:
      'space-between',
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
    backgroundColor:
      COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },

  salonCard: {
    backgroundColor:
      COLORS.primary,
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },

  salonName: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: '800',
  },

  salonInfo: {
    marginTop: 5,
    color: '#E9D5FF',
    fontSize: 13,
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent:
      'space-between',
    paddingHorizontal: 20,
    marginBottom: 24,
  },

  statCard: {
    width: '31%',
    backgroundColor:
      COLORS.card,
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

  addServiceBtn: {
    marginHorizontal: 20,
    marginBottom: 22,
    backgroundColor:
      COLORS.primary,
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

  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
    paddingHorizontal: 20,
    marginBottom: 15,
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
    backgroundColor:
      COLORS.primary,
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

});