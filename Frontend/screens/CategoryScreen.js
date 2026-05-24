import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import MainLayout from '../components/MainLayout';
import SalonCard from '../components/SalonCard';
import FilterModal from '../components/FilterModal';
import { SALONS } from '../data/salons';

export default function CategoryScreen({
  route,
  navigation,
}) {

  const { category } = route.params;

  const [showFilters, setShowFilters] = useState(false);

  const salons = SALONS.filter(
    item =>
      item.service?.toLowerCase().includes(
      category?.toLowerCase()
    )
  );

  return (

    <MainLayout navigation={navigation}>

      <SafeAreaView style={styles.container}>

        {/* HEADER */}
        <View style={styles.topRow}>

          <Text style={styles.header}>
            {category}
          </Text>

          <TouchableOpacity
            style={styles.filterBtn}
            onPress={() => setShowFilters(true)}
          >

            <Ionicons
              name="options-outline"
              size={18}
              color="#7C3AED"
            />

            <Text style={styles.filterText}>
              Filters
            </Text>

          </TouchableOpacity>

        </View>

        {/* EMPTY */}
        {salons.length === 0 ? (

          <View style={styles.empty}>

            <Ionicons
              name="search-outline"
              size={70}
              color="#C4B5FD"
            />

            <Text style={styles.emptyTitle}>
              No Salons Found
            </Text>

            <Text style={styles.emptyText}>
              No salons available in this category.
            </Text>

          </View>

        ) : (

          <FlatList
            data={salons}
            renderItem={({ item }) => (

              <SalonCard
                salon={item}
                navigation={navigation}
              />

            )}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: 'space-between'
            }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 120
            }}
          />

        )}

        {/* FILTER MODAL */}
        <FilterModal
          visible={showFilters}
          onClose={() => setShowFilters(false)}
          checkedOption={category}
          options={[
            category,
            'Nearest',
            'Fastest',
            'Highly Rated',
            'Cheap to Costly',
          ]}
        />

      </SafeAreaView>

    </MainLayout>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F3F0FF',
    paddingHorizontal: 15,
    margin: 20,
    marginBottom: 0,
  },

  /* HEADER */
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  header: {
    fontSize: 24,
    fontWeight: '900',
    marginTop: 10,
    marginLeft: 5,
  },

  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDEBFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
    marginTop: 10,
  },

  filterText: {
    marginLeft: 6,
    color: '#7C3AED',
    fontSize: 12,
    fontWeight: '700',
  },

  /* EMPTY */
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
  },

  emptyText: {
    fontSize: 13,
    color: '#777',
    marginTop: 5,
    textAlign: 'center',
    paddingHorizontal: 40,
  },

  /* MODAL */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  filterModal: {
    width: '82%',
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 22,
  },

  filterTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 20,
    color: '#111',
  },

  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },

  optionText: {
    marginLeft: 12,
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
  },

  applyBtn: {
    marginTop: 10,
    height: 52,
    backgroundColor: '#7C3AED',
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },

  applyText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },

});