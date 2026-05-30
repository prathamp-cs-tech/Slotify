// components/SalonCard.js

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

import { useState } from 'react';

import {
  Ionicons,
} from '@expo/vector-icons';

import {
  COLORS,
} from '../constants/colors';

export default function SalonCard({

  salon,
  navigation,
  favorites = [],
  toggleFav,

}) {

  const [imageLoading,
    setImageLoading] =
      useState(true);

  const service =
    salon.serviceData;

  const isFav =
    Array.isArray(favorites)

      ? favorites.includes(
          service._id
        )

      : false;

  return (

    <TouchableOpacity

      style={styles.card}

      onPress={() =>

        navigation.navigate(
          'Salon',
          {
            salon,
          }
        )

      }
    >

      <View style={styles.imageContainer}>

        {imageLoading && (

          <View
            style={styles.imageLoader}
          />

        )}

        <Image

          source={{
            uri:
              service.image ||
              salon.image,
          }}

          style={styles.image}

          resizeMode="cover"

          onLoad={() =>
            setImageLoading(false)
          }

          onError={() =>
            setImageLoading(false)
          }

        />

      </View>

      <TouchableOpacity

        style={styles.favBtn}

        onPress={() =>

          toggleFav &&
          toggleFav(salon)

        }
      >

        <Ionicons

          name={
            isFav
              ? 'heart'
              : 'heart-outline'
          }

          size={16}

          color={
            isFav
              ? '#EF4444'
              : COLORS.text
          }

        />

      </TouchableOpacity>

      <View style={styles.content}>

        <Text
          numberOfLines={1}
          style={styles.serviceName}
        >
          {service.name}
        </Text>

        <Text
          numberOfLines={1}
          style={styles.salonName}
        >
          {salon.name}
        </Text>

        <View style={styles.row}>

          <View style={styles.ratingRow}>

            <Ionicons
              name="star"
              size={13}
              color="#F59E0B"
            />

            <Text style={styles.rating}>
              {service.averageRating
                ?.toFixed(1) || '0.0'}
            </Text>

          </View>

          <Text style={styles.price}>
            ₹{service.price}
          </Text>

        </View>

        <View style={styles.categoryChip}>

          <Text style={styles.categoryText}>
            {service.category}
          </Text>

        </View>

      </View>

    </TouchableOpacity>

  );

}

const styles = StyleSheet.create({

  card: {
    width: '48%',
    backgroundColor:
      COLORS.white,
    borderRadius: 18,
    marginBottom: 16,
    overflow: 'hidden',
  },

  imageContainer: {
    position: 'relative',
  },

  image: {
    width: '100%',
    height: 120,
  },

  imageLoader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#E5E7EB',
    zIndex: 1,
  },

  favBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor:
      'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    padding: 12,
  },

  serviceName: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.text,
  },

  salonName: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 3,
  },

  row: {
    flexDirection: 'row',
    justifyContent:
      'space-between',
    alignItems: 'center',
    marginTop: 10,
  },

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  rating: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.text,
  },

  price: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.primary,
  },

  categoryChip: {
    marginTop: 10,
    alignSelf: 'flex-start',
    backgroundColor:
      COLORS.card,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  categoryText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.primary,
  },

});