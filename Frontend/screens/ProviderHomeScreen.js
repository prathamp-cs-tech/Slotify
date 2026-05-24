import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
} from 'react-native';

import {
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

import MainLayout from '../components/MainLayout';
import SalonCard from '../components/SalonCard';

import { SALONS } from '../data/salons';
import { CATEGORIES } from '../data/categories';
export default function HomeScreen({ navigation }) {

  const [favorites, setFavorites] = useState({});

  const toggleFav = (id) => {
    setFavorites(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (

    <MainLayout navigation={navigation}>

      <SafeAreaView style={styles.safe}>

        <StatusBar
          barStyle="dark-content"
          backgroundColor="#F7F5FF"
        />

        {/* HEADER */}
        <View style={styles.header}>

          <Text style={styles.brand}>
            Provider Home
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
              />

            </TouchableOpacity>

          </View>

        </View>

        {/* SEARCH */}
        <View style={styles.searchBar}>

          <Ionicons
            name="search-outline"
            size={18}
            color="#999"
          />

          <TextInput
            placeholder="Search Salon, Specialist"
            style={styles.searchInput}
          />

        </View>

        {/* CATEGORIES */}
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
                  category: cat.label
                })
              }
            >

              <View style={styles.catIcon}>

                <MaterialCommunityIcons
                  name={cat.icon}
                  size={22}
                  color="#7C3AED"
                />

              </View>

              <Text style={styles.catLabel}>
                {cat.label}
              </Text>

            </TouchableOpacity>

          ))}

        </View>

        {/* TITLE */}
        <Text style={styles.sectionTitle}>
          Trending near you
        </Text>

        {/* GRID */}
        <ScrollView
          showsVerticalScrollIndicator={false}
        >

          <View style={styles.grid}>

            {SALONS.map((salon) => (

              <SalonCard
                key={salon.id}
                salon={salon}
                navigation={navigation}
                favorites={favorites}
                toggleFav={toggleFav}
              />

            ))}

          </View>

          <View style={{ height: 100 }} />

        </ScrollView>

      </SafeAreaView>

    </MainLayout>

  );
}

const styles = StyleSheet.create({

  safe: {
    flex: 1,
    backgroundColor: '#F7F5FF',
  },

  /* HEADER */
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 15,
    marginBottom: 15,
  },

  brand: {
    fontSize: 24,
    fontWeight: '900',
    color: '#6D28D9',
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
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* SEARCH */
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#EDEBFF',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginBottom: 20,
  },

  searchInput: {
    marginLeft: 10,
    flex: 1,
  },

  /* SECTION */
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginLeft: 20,
    marginBottom: 10,
  },

  /* CATEGORIES */
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
    backgroundColor: '#EDE9FE',
    justifyContent: 'center',
    alignItems: 'center',
  },

  catLabel: {
    fontSize: 12,
    marginTop: 6,
    fontWeight: '600',
    color: '#444',
  },

  /* GRID */
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },

});