import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  Image, StyleSheet, StatusBar, SafeAreaView, ScrollView
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import MainLayout from '../components/MainLayout';
import { SALONS } from '../data/salons';

const CATEGORIES = [
  { id: '1', icon: 'content-cut', label: 'Haircut' },
  { id: '2', icon: 'face-woman', label: 'Facial' },
  { id: '3', icon: 'spa', label: 'Spa' },
  { id: '4', icon: 'brush', label: 'Makeup' },
  { id: '5', icon: 'mustache', label: 'Beard' },
];

export default function HomeScreen({ navigation }) {
  const [favorites, setFavorites] = useState({});

  const toggleFav = (id) => {
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <MainLayout navigation={navigation}>
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="dark-content" backgroundColor="#F7F5FF" />

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.brand}>SLOTIFY</Text>

          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconBtn}
            onPress={() => navigation.navigate('Favorites')}>
              <Ionicons name="heart-outline" size={20} />
            </TouchableOpacity>
          </View>
        </View>

        {/* SEARCH */}
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={18} color="#999" />
          <TextInput
            placeholder="Search Salon, Specialist"
            style={styles.searchInput}
          />
        </View>

        {/* CATEGORIES */}
        <Text style={styles.sectionTitle}>Popular Categories</Text>

        <View style={styles.categories}>
          {CATEGORIES.map(cat => (
            <TouchableOpacity key={cat.id} style={styles.catItem} 
            onPress={() =>
              navigation.navigate('Category', {
                category: cat.label})}>
              <View style={styles.catIcon}>
                <MaterialCommunityIcons name={cat.icon} size={22} color="#7C3AED" />
              </View>
              <Text style={styles.catLabel}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* TITLE */}
        <Text style={styles.sectionTitle}>Trending near you</Text>

        {/* GRID */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.grid}>
            {SALONS.map((salon) => (
              <TouchableOpacity
                key={salon.id}
                style={styles.card}
                onPress={() => navigation.navigate('Salon', { salon })}
              >
                <View>
                  <Image source={{ uri: salon.image }} style={styles.image} />

                  <TouchableOpacity
                    style={styles.like}
                    onPress={(e) => {
                      e.stopPropagation();
                      toggleFav(salon.id);
                    }}
                  >
                    <Ionicons
                      name={favorites[salon.id] ? 'heart' : 'heart-outline'}
                      size={16}
                      color={favorites[salon.id] ? '#EF4444' : '#333'}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.cardBody}>
                  <Text
                    style={styles.name}
                    numberOfLines={1}
                  >
                    {salon.name}
                  </Text>
                  <Text style={styles.service}>
                    {salon.service}
                  </Text>
                  <View style={styles.row}>
                    <Text style={styles.price}>
                      ₹{salon.price}
                    </Text>
                    <View style={styles.ratingRow}>
                      <Ionicons
                        name="star"
                        size={12}
                        color="#F59E0B"
                      />
                      <Text style={styles.rating}>
                        {salon.rating}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>

      </SafeAreaView>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F7F5FF' },

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

  headerIcons: { flexDirection: 'row', gap: 10 },

  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#EDEBFF',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginBottom: 20,
  },

  searchInput: { marginLeft: 10, flex: 1 },

  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginLeft: 20,
    marginBottom: 10,
  },

  categories: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  catItem: { alignItems: 'center' },

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

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },

  card: {
    width: '48%',
    backgroundColor: '#EDEBFF',
    borderRadius: 16,
    marginBottom: 15,
    marginTop: 10,
  },

  image: {
    width: '100%',
    height: 110,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },

  like: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 20,
  },

  cardBody: { padding: 10 },

  name: { fontSize: 14, fontWeight: '700' },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },

  price: { fontSize: 13, fontWeight: '600' },
  rating: { fontSize: 12, color: '#555' },
  service: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    marginBottom: 8,
    fontWeight: '500',
  },
  
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  rating: {
    marginLeft: 4,
    fontSize: 12,
    color: '#555',
    fontWeight: '600',
  },
});