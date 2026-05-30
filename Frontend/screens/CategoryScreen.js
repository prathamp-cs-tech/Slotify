import {
  useState,
  useCallback,
  useEffect,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

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

export default function CategoryScreen({

  route,
  navigation,

}) {

  const { category } =
    route.params;

  const [services,
    setServices] =
      useState([]);

  const [filteredServices,
    setFilteredServices] =
      useState([]);

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

  useFocusEffect(

    useCallback(() => {

      fetchServices();

    }, [])

  );

  useEffect(() => {

    let updated =
      [...services];

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

    setFilteredServices(
      updated
    );

  }, [
    services,
    selectedSort,
  ]);

  const fetchServices =
    async () => {

      try {

        setLoading(true);

        const response =
          await API.get(
            '/salons'
          );

        const flattened = [];

        response.data.forEach(

          (salon) => {

            salon.services

              .filter(

                service =>

                  service.category
                    .toLowerCase() ===

                  category
                    .toLowerCase() &&

                  service.isActive

              )

              .forEach(

                (service) => {

                  flattened.push({

                    ...salon,

                    serviceData:
                      service,

                  });

                }

              );

          }

        );

        setServices(flattened);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

  const clearFilters =
    () => {

      setSelectedSort('');

    };

  return (

    <MainLayout
      navigation={navigation}
    >

      <View style={styles.container}>

        <Text style={styles.title}>
          {category}
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

          <View style={styles.loader}>

            <ActivityIndicator
              size="large"
              color={COLORS.primary}
            />

          </View>

        ) : filteredServices.length === 0 ? (

          <View style={styles.empty}>

            <Text style={styles.emptyText}>
              No services found
            </Text>

          </View>

        ) : (

          <FlatList

            data={filteredServices}

            keyExtractor={(item) =>

              `${item._id}-${item.serviceData._id}`

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

  title: {
    fontSize: 30,
    fontWeight: '900',
    color: COLORS.text,
    marginBottom: 20,
  },

  filtersContainer: {
    height: 60,
    marginBottom: 12,
  },

  sortRow: {
    height: 50,
    alignItems: 'center',
    paddingRight: 20,
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

  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.gray,
  },

});