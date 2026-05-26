import { useState, useRef, useEffect } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  Animated,
  Easing,
} from 'react-native';

import {
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

import MainLayout from '../components/MainLayout';
import SalonCard from '../components/SalonCard';

import { CATEGORIES } from '../data/categories';
import { COLORS } from '../constants/colors';

import API from '../services/api';

import useFavorites from '../hooks/useFavorites';

export default function HomeScreen({ navigation }) {

  const [salons, setSalons] = useState([]);

  const [loading, setLoading] = useState(true);

  const {
    favorites,
    toggleFav,
  } = useFavorites();

  const slideAnim = useRef(
    new Animated.Value(-120)
  ).current;

  useEffect(() => {

    Animated.loop(

      Animated.timing(slideAnim, {

        toValue: 320,
        duration: 1200,
        easing: Easing.linear,
        useNativeDriver: true,

      })

    ).start();

  }, []);

  useEffect(() => {

    const fetchSalons = async () => {

      try {

        const response = await API.get('/salons');

        setSalons(response.data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

    fetchSalons();

  }, []);

  return (

    <MainLayout navigation={navigation}>

      <View style={styles.safe}>

        <StatusBar
          barStyle="dark-content"
          backgroundColor={COLORS.background}
        />

        <View style={styles.header}>

          <Text style={styles.brand}>
            SLOTIFY
          </Text>

          <View style={styles.headerIcons}>

            <TouchableOpacity
              style={styles.iconBtn}
              onPress={() =>
                navigation.navigate('Favorites')
              }
            >

              <Ionicons
                name="heart-outline"
                size={20}
                color={COLORS.text}
              />

            </TouchableOpacity>

          </View>

        </View>

        <View style={styles.searchBar}>

          <Ionicons
            name="search-outline"
            size={18}
            color={COLORS.lightGray}
          />

          <TextInput
            placeholder="Search Salon, Specialist"
            placeholderTextColor={COLORS.lightGray}
            style={styles.searchInput}
          />

        </View>

        <Text style={styles.sectionTitle}>
          Popular Categories
        </Text>

        <View style={styles.categories}>

          {CATEGORIES.map(cat => (

            <TouchableOpacity
              key={cat.id}
              style={styles.catItem}
              onPress={() =>
                navigation.navigate('Category', {
                  category: cat.label,
                })
              }
            >

              <View style={styles.catIcon}>

                <MaterialCommunityIcons
                  name={cat.icon}
                  size={22}
                  color={COLORS.primary}
                />

              </View>

              <Text style={styles.catLabel}>
                {cat.label}
              </Text>

            </TouchableOpacity>

          ))}

        </View>

        <Text style={styles.sectionTitle}>
          Trending near you
        </Text>

        <ScrollView
          showsVerticalScrollIndicator={false}
        >

          {loading ? (

            <View style={styles.loaderContainer}>

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

          ) : (

            <View style={styles.grid}>

              {salons.map((salon) => (

                <SalonCard
                  key={salon._id}
                  salon={salon}
                  navigation={navigation}
                  favorites={favorites}
                  toggleFav={toggleFav}
                />

              ))}

            </View>

          )}

          <View style={{ height: 100 }} />

        </ScrollView>

      </View>

    </MainLayout>

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
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 15,
  },

  brand: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.primary,
    letterSpacing: 3,
  },

  headerIcons: {
    flexDirection: 'row',
    gap: 10,
  },

  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },

  searchBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginBottom: 20,
  },

  searchInput: {
    marginLeft: 10,
    flex: 1,
    color: COLORS.text,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginLeft: 20,
    marginBottom: 10,
    color: COLORS.text,
  },

  categories: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  catItem: {
    alignItems: 'center',
  },

  catIcon: {
    width: 55,
    height: 55,
    borderRadius: 14,
    backgroundColor: COLORS.card,
    justifyContent: 'center',
    alignItems: 'center',
  },

  catLabel: {
    fontSize: 12,
    marginTop: 6,
    fontWeight: '600',
    color: '#444',
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },

  loaderContainer: {
    marginTop: 50,
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
    width: 120,
    height: 5,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
  },

});