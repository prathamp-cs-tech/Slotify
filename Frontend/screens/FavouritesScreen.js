import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
  Modal,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import MainLayout from '../components/MainLayout';
import { SALONS } from '../data/salons';

export default function FavoritesScreen({ navigation }) {

  const [showFilters, setShowFilters] = useState(false);

  const favorites = [
    SALONS[0],
    SALONS[2],
    SALONS[4],
    SALONS[5],
    SALONS[6],
    SALONS[7],
    SALONS[8],
  ];

  const renderItem = ({ item }) => (

    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={() =>
        navigation.navigate('Salon', {
          salon: item
        })
      }
    >

      {/* IMAGE */}
      <View>

        <Image
          source={{ uri: item.image }}
          style={styles.image}
        />

        {/* HEART */}
        <TouchableOpacity style={styles.heart}>

          <Ionicons
            name="heart"
            size={16}
            color="#EF4444"
          />

        </TouchableOpacity>

      </View>

      {/* BODY */}
      <View style={styles.cardBody}>

        <Text
          style={styles.name}
          numberOfLines={1}
        >
          {item.name}
        </Text>

        <Text style={styles.service}>
          {item.service}
        </Text>

        <View style={styles.row}>

          <Text style={styles.price}>
            ₹{item.price}
          </Text>

          <View style={styles.ratingRow}>

            <Ionicons
              name="star"
              size={12}
              color="#F59E0B"
            />

            <Text style={styles.rating}>
              {item.rating}
            </Text>

          </View>

        </View>

      </View>

    </TouchableOpacity>

  );

  return (

    <MainLayout navigation={navigation}>

      <SafeAreaView style={styles.container}>

        {/* HEADER + FILTER */}
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
              color="#7C3AED"
            />

            <Text style={styles.filterText}>
              Filters
            </Text>

          </TouchableOpacity>

        </View>

        {/* EMPTY STATE */}
        {favorites.length === 0 ? (

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
            data={favorites}
            renderItem={renderItem}
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
        <Modal
          transparent
          visible={showFilters}
          animationType="fade"
        >

          <View style={styles.modalOverlay}>

            <View style={styles.filterModal}>

              <Text style={styles.filterTitle}>
                Filters
              </Text>

              {[
                'Haircut',
                'Spa',
                'Beard',
                'Makeup',
                'Facial'
              ].map((item) => (

                <TouchableOpacity
                  key={item}
                  style={styles.filterOption}
                >

                  <Ionicons
                    name="square-outline"
                    size={22}
                    color="#7C3AED"
                  />

                  <Text style={styles.optionText}>
                    {item}
                  </Text>

                </TouchableOpacity>

              ))}

              <TouchableOpacity
                style={styles.applyBtn}
                onPress={() => setShowFilters(false)}
              >

                <Text style={styles.applyText}>
                  Apply Filters
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
  },

  filterText: {
    marginLeft: 6,
    color: '#7C3AED',
    fontSize: 12,
    fontWeight: '700',
  },

  /* CARD */
  card: {
    width: '48%',
    backgroundColor: '#EDEBFF',
    borderRadius: 18,
    marginBottom: 15,
    overflow: 'hidden',
  },

  image: {
    width: '100%',
    height: 120,
  },

  heart: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  cardBody: {
    padding: 10,
  },

  name: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },

  service: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
    marginTop: 4,
    fontWeight: '500',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  price: {
    fontSize: 13,
    fontWeight: '700',
    color: '#7C3AED',
  },

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  rating: {
    marginLeft: 3,
    fontSize: 12,
    color: '#555',
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