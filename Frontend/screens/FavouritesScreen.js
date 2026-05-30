import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Animated,
  Easing,
  ScrollView,
} from 'react-native';

import {
  Ionicons,
} from '@expo/vector-icons';

import {
  useFocusEffect,
} from '@react-navigation/native';

import MainLayout from '../components/MainLayout';

import SalonCard from '../components/SalonCard';

import API from '../services/api';

import {
  COLORS,
} from '../constants/colors';

import useFavorites from '../hooks/useFavorites';

export default function FavoritesScreen({
  navigation,
}) {

  const [favoritesData,
    setFavoritesData] =
      useState([]);

  const [filteredFavorites,
    setFilteredFavorites] =
      useState([]);

  const [selectedCategory,
    setSelectedCategory] =
      useState('All');

  const [selectedSort,
    setSelectedSort] =
      useState('');

  const [loading,
    setLoading] =
      useState(true);

  const {
    favorites,
    toggleFav,
  } = useFavorites();

  const slideAnim = useRef(
    new Animated.Value(-120)
  ).current;

  const categories = [

    'All',
    'Hair',
    'Beard',
    'Facial',
    'Makeup',
    'Spa',

  ];

  const sortOptions = [

    {
      label: 'Rating ↑',
      value: 'ratingHigh',
    },

    {
      label: 'Rating ↓',
      value: 'ratingLow',
    },

    {
      label: 'Price ↑',
      value: 'priceLow',
    },

    {
      label: 'Price ↓',
      value: 'priceHigh',
    },

  ];

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

      fetchFavorites();

    }, [favorites])

  );

  useEffect(() => {

    let updated =
      [...favoritesData];

    if (
      selectedCategory !== 'All'
    ) {

      updated =
        updated.filter(

          item =>

            item.serviceData
              .category ===
            selectedCategory

        );

    }

    if (
      selectedSort ===
      'ratingHigh'
    ) {

      updated.sort(

        (a, b) =>

          b.serviceData
            .averageRating -

          a.serviceData
            .averageRating

      );

    }

    if (
      selectedSort ===
      'ratingLow'
    ) {

      updated.sort(

        (a, b) =>

          a.serviceData
            .averageRating -

          b.serviceData
            .averageRating

      );

    }

    if (
      selectedSort ===
      'priceLow'
    ) {

      updated.sort(

        (a, b) =>

          a.serviceData.price -

          b.serviceData.price

      );

    }

    if (
      selectedSort ===
      'priceHigh'
    ) {

      updated.sort(

        (a, b) =>

          b.serviceData.price -

          a.serviceData.price

      );

    }

    setFilteredFavorites(
      updated
    );

  }, [

    favoritesData,
    selectedCategory,
    selectedSort,

  ]);

  const fetchFavorites =
    async () => {

      try {

        setLoading(true);

        const response =
          await API.get(
            '/favorites'
          );

        const formatted =

          response.data

            .filter(
              item => item.serviceId
            )

            .map((item) => ({

              ...item.salonId,

              serviceData:
                item.serviceId,

              favoriteId:
                item._id,

            }));

        setFavoritesData(
          formatted
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

  const clearFilters =
    () => {

      setSelectedCategory(
        'All'
      );

      setSelectedSort('');

    };

  return (

    <MainLayout
      navigation={navigation}
    >

      <View style={styles.container}>

        <Text style={styles.header}>
          Favorites
        </Text>

        {!loading && (

          <View
            style={
              styles.filtersContainer
            }
          >

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={
                false
              }
              contentContainerStyle={
                styles.categoryRow
              }
            >

              {categories.map(
                (item) => (

                  <TouchableOpacity

                    key={item}

                    style={[

                      styles.chip,

                      selectedCategory ===
                        item &&

                        styles.activeChip,

                    ]}

                    onPress={() =>
                      setSelectedCategory(
                        item
                      )
                    }
                  >

                    <Text
                      style={[

                        styles.chipText,

                        selectedCategory ===
                          item &&

                          styles.activeChipText,

                      ]}
                    >
                      {item}
                    </Text>

                  </TouchableOpacity>

                )
              )}

            </ScrollView>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={
                false
              }
              contentContainerStyle={
                styles.sortRow
              }
            >

              {sortOptions.map(
                (item) => (

                  <TouchableOpacity

                    key={item.value}

                    style={[

                      styles.sortChip,

                      selectedSort ===
                        item.value &&

                        styles.activeSortChip,

                    ]}

                    onPress={() =>
                      setSelectedSort(
                        item.value
                      )
                    }
                  >

                    <Text
                      style={[

                        styles.sortText,

                        selectedSort ===
                          item.value &&

                          styles.activeSortText,

                      ]}
                    >
                      {item.label}
                    </Text>

                  </TouchableOpacity>

                )
              )}

              <TouchableOpacity
                style={styles.clearChip}
                onPress={
                  clearFilters
                }
              >

                <Text
                  style={styles.clearText}
                >
                  Clear
                </Text>

              </TouchableOpacity>

            </ScrollView>

          </View>

        )}

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

        ) : filteredFavorites.length === 0 ? (

          <View style={styles.empty}>

            <Ionicons
              name="heart-outline"
              size={70}
              color="#C4B5FD"
            />

            <Text
              style={styles.emptyTitle}
            >
              No Favorites Found
            </Text>

            <Text
              style={styles.emptyText}
            >
              Try changing filters.
            </Text>

          </View>

        ) : (

          <FlatList

            data={filteredFavorites}

            renderItem={({ item }) => (

              <SalonCard
                salon={item}
                navigation={
                  navigation
                }
                favorites={
                  favorites
                }
                toggleFav={
                  toggleFav
                }
              />

            )}

            keyExtractor={(item) =>

              item.favoriteId

            }

            numColumns={2}

            columnWrapperStyle={
              styles.row
            }

            showsVerticalScrollIndicator={
              false
            }

            contentContainerStyle={{
              paddingBottom: 120,
            }}

          />

        )}

      </View>

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
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.text,
    marginBottom: 20,
  },

  filtersContainer: {
    height: 110,
    marginBottom: 10,
  },

  categoryRow: {
    height: 50,
    alignItems: 'center',
    paddingRight: 20,
  },

  sortRow: {
    height: 50,
    alignItems: 'center',
    paddingRight: 20,
    marginTop: 10,
  },

  chip: {
    backgroundColor:
      COLORS.card,
    paddingHorizontal: 20,
    height: 42,
    borderRadius: 999,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  activeChip: {
    backgroundColor:
      COLORS.primary,
  },

  chipText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
  },

  activeChipText: {
    color: COLORS.white,
  },

  sortChip: {
    backgroundColor:
      COLORS.card,
    paddingHorizontal: 20,
    height: 42,
    borderRadius: 999,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  activeSortChip: {
    backgroundColor:
      COLORS.primary,
  },

  sortText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
  },

  activeSortText: {
    color: COLORS.white,
  },

  clearChip: {
    backgroundColor:
      '#FEE2E2',
    paddingHorizontal: 20,
    height: 42,
    borderRadius: 999,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  clearText: {
    color: '#DC2626',
    fontWeight: '700',
    fontSize: 14,
  },

  row: {
    justifyContent:
      'space-between',
    marginBottom: 16,
  },

  loaderWrapper: {
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

  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 15,
    color: COLORS.text,
  },

  emptyText: {
    fontSize: 13,
    color: COLORS.gray,
    marginTop: 5,
  },

});