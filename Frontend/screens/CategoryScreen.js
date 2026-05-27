// screens/CategoryScreen.js

import {
  useState,
  useCallback,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import {
  useFocusEffect,
} from '@react-navigation/native';

import {
  Ionicons,
} from '@expo/vector-icons';

import MainLayout from '../components/MainLayout';

import SalonCard from '../components/SalonCard';

import API from '../services/api';

import { COLORS } from '../constants/colors';

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

  const [loading,
    setLoading] =
      useState(true);

  const {
    favorites,
    toggleFav,
  } = useFavorites();

  useFocusEffect(

    useCallback(() => {

      fetchServices();

    }, [])

  );

  const fetchServices =
    async () => {

      try {

        setLoading(true);

        const response =
          await API.get('/salons');

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

  return (

    <MainLayout
      navigation={navigation}
    >

      <View style={styles.container}>

        <View style={styles.header}>

          <Text style={styles.title}>
            {category}
          </Text>

          <TouchableOpacity
            style={styles.filterBtn}
          >

            <Ionicons
              name="options-outline"
              size={18}
              color={COLORS.primary}
            />

          </TouchableOpacity>

        </View>

        {!loading && (

          <FlatList

            data={services}

            keyExtractor={(item) =>

              `${item._id}-${item.serviceData._id}`

            }

            numColumns={2}

            columnWrapperStyle={
              styles.row
            }

            showsVerticalScrollIndicator={false}

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

  header: {
    flexDirection: 'row',
    justifyContent:
      'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },

  title: {
    fontSize: 30,
    fontWeight: '900',
    color: COLORS.text,
  },

  filterBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor:
      COLORS.card,
    justifyContent: 'center',
    alignItems: 'center',
  },

  row: {
    justifyContent:
      'space-between',
    marginBottom: 14,
  },

});