import React, { useState, useCallback } from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { useFocusEffect } from '@react-navigation/native';

import MainLayout from '../components/MainLayout';
import SalonCard from '../components/SalonCard';
import FilterModal from '../components/FilterModal';

import API from '../services/api';

import { COLORS } from '../constants/colors';

import useFavorites from '../hooks/useFavorites';

export default function FavoritesScreen({ navigation }) {

  const [showFilters, setShowFilters] = useState(false);

  const [favoritesData, setFavoritesData] = useState([]);

  const {
    favorites,
    toggleFav,
  } = useFavorites();

  useFocusEffect(
    useCallback(() => {

      const fetchFavorites = async () => {

        try {

          const response = await API.get('/favorites');

          setFavoritesData(response.data);

        } catch (error) {

          console.log(error);

        }

      };

      fetchFavorites();

    }, [])
  );

  return (

    <MainLayout navigation={navigation}>

      <View style={styles.container}>

        <View style={styles.topRow}>

          <Text style={styles.header}>
            Favorites
          </Text>

          <TouchableOpacity
            style={styles.filterBtn}
            onPress={() => setShowFilters(true)}
          >

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

        {favoritesData.length === 0 ? (

          <View style={styles.empty}>

            <Ionicons
              name="heart-outline"
              size={70}
              color="#C4B5FD"
            />

            <Text style={styles.emptyTitle}>
              No Favorites Yet
            </Text>

            <Text style={styles.emptyText}>
              Save salons you like for quick access.
            </Text>

          </View>

        ) : (

          <FlatList
            data={favoritesData}
            renderItem={({ item }) => (

              <SalonCard
                salon={item.salonId}
                navigation={navigation}
                favorites={favorites}
                toggleFav={toggleFav}
              />

            )}
            keyExtractor={(item) => item._id}
            numColumns={2}
            columnWrapperStyle={styles.row}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 120,
            }}
          />

        )}

        <FilterModal
          visible={showFilters}
          onClose={() => setShowFilters(false)}
          checkedOption=""
          options={[
            'Haircut',
            'Spa',
            'Beard',
            'Makeup',
            'Facial',
          ]}
        />

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

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 22,
  },

  header: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.text,
  },

  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 14,
  },

  filterText: {
    marginLeft: 6,
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '700',
  },

  row: {
    justifyContent: 'space-between',
    marginBottom: 14,
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
    textAlign: 'center',
    paddingHorizontal: 40,
  },

});