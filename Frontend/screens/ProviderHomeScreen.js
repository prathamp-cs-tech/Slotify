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

import ProviderLayout from '../components/ProviderLayout';
import ProviderCard from '../components/ProviderCard';

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

    <ProviderLayout navigation={navigation}>

      <SafeAreaView style={styles.safe}>

        <StatusBar
          barStyle="dark-content"
          backgroundColor="#F7F5FF"
        />

        {/* HEADER */}
        <View style={styles.header}>

          <Text style={styles.brand}>
            SLOTIFY
          </Text>
        </View>

        {/* TITLE */}
        <Text style={styles.sectionTitle}>
          Your Services
        </Text>

        {/* GRID */}
        <ScrollView
          showsVerticalScrollIndicator={false}
        >

          <View style={styles.grid}>

            {SALONS.map((salon) => (

            <ProviderCard
                key={salon.id}
                salon={salon}
                navigation={navigation}
            />

            ))}

          </View>

          <View style={{ height: 100 }} />

        </ScrollView>

      </SafeAreaView>

    </ProviderLayout>

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

  /* SECTION */
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginLeft: 20,
    marginBottom: 10,
  },

  /* GRID */
  grid: {
    paddingHorizontal: 16,
  },

});