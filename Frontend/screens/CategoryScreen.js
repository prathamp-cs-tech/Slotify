import { useState, useEffect } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Animated,
  Easing,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import MainLayout from '../components/MainLayout';
import SalonCard from '../components/SalonCard';

import API from '../services/api';

import { COLORS } from '../constants/colors';

import useFavorites from '../hooks/useFavorites';

export default function CategoryScreen({ route, navigation }) {

  const { category } = route.params;

  const [salons, setSalons] = useState([]);

  const [loading, setLoading] = useState(true);

  const {
    favorites,
    toggleFav,
  } = useFavorites();

  const loaderAnim = useState(
    new Animated.Value(-150)
  )[0];

  useEffect(() => {

    Animated.loop(

      Animated.timing(loaderAnim, {

        toValue: 350,
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

        const filtered = response.data.filter(
          salon =>
            salon.service.toLowerCase() ===
            category.toLowerCase()
        );

        setSalons(filtered);

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

      <View style={styles.container}>

        <View style={styles.header}>

          <Text style={styles.title}>
            {category}
          </Text>

          <TouchableOpacity style={styles.filterBtn}>

            <Ionicons
              name="options-outline"
              size={18}
              color={COLORS.primary}
            />

            <Text style={styles.filterText}>
              Filters
            </Text>

          </TouchableOpacity>

        </View>

        {loading && (

          <View style={styles.loaderWrapper}>

            <View style={styles.loaderTrack}>

              <Animated.View
                style={[
                  styles.loaderBar,
                  {
                    transform: [
                      {
                        translateX: loaderAnim,
                      },
                    ],
                  },
                ]}
              />

            </View>

          </View>

        )}

        {!loading && salons.length === 0 && (

          <Text style={styles.emptyText}>
            No salons found
          </Text>

        )}

        {!loading && salons.length > 0 && (

          <FlatList
            data={salons}
            keyExtractor={(item) => item._id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={styles.row}
            contentContainerStyle={{
              paddingBottom: 120,
            }}
            renderItem={({ item }) => (

              <SalonCard
                salon={item}
                navigation={navigation}
                favorites={favorites}
                toggleFav={toggleFav}
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
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },

  title: {
    fontSize: 32,
    fontWeight: '900',
    color: COLORS.text,
  },

  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
  },

  filterText: {
    marginLeft: 7,
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 14,
  },

  row: {
    justifyContent: 'space-between',
    marginBottom: 14,
  },

  loaderWrapper: {
    marginTop: 40,
    alignItems: 'center',
  },

  loaderTrack: {
    width: '90%',
    height: 5,
    backgroundColor: '#DDD6FE',
    borderRadius: 10,
    overflow: 'hidden',
  },

  loaderBar: {
    width: 150,
    height: 5,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
  },

  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: COLORS.gray,
    fontWeight: '600',
  },

});