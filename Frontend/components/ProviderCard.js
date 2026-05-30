import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

import { useState } from 'react';

import { Ionicons } from '@expo/vector-icons';

import { COLORS } from '../constants/colors';

export default function ProviderCard({
  salon,
  service,
  navigation,
}) {

  const [imageLoading,
    setImageLoading] =
      useState(true);

  return (

    <TouchableOpacity

      style={styles.card}

      onPress={() =>

        navigation.navigate(
          'EditService',
          {
            salon,
            service,
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

      <View style={styles.content}>

        <View style={styles.topRow}>

          <Text
            style={styles.serviceName}
            numberOfLines={1}
          >
            {service.name}
          </Text>

          <View style={styles.categoryBadge}>

            <Text style={styles.categoryText}>
              {service.category}
            </Text>

          </View>

        </View>

        <Text
          style={styles.salonName}
          numberOfLines={1}
        >
          {salon.name}
        </Text>

        <View style={styles.bottomRow}>

          <Text style={styles.price}>
            ₹{service.price}
          </Text>

          <View style={styles.ratingRow}>

            <Ionicons
              name="star"
              size={14}
              color="#F59E0B"
            />

            <Text style={styles.rating}>

              {service.averageRating
                ? service.averageRating.toFixed(1)
                : '0.0'}

            </Text>

          </View>

        </View>

        <View style={styles.statusRow}>

          <View

            style={[

              styles.statusDot,

              {
                backgroundColor:
                  service.isActive
                    ? '#10B981'
                    : '#EF4444',
              },

            ]}

          />

          <Text style={styles.statusText}>

            {service.isActive
              ? 'Active'
              : 'Inactive'}

          </Text>

        </View>

      </View>

    </TouchableOpacity>

  );

}

const styles = StyleSheet.create({

  card: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 18,
  },

  imageContainer: {
    position: 'relative',
  },

  image: {
    width: '100%',
    height: 170,
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

  content: {
    padding: 15,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent:
      'space-between',
    alignItems: 'center',
  },

  serviceName: {
    flex: 1,
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.text,
    marginRight: 10,
  },

  categoryBadge: {
    backgroundColor: '#EDE9FE',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },

  categoryText: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: '700',
  },

  salonName: {
    marginTop: 7,
    color: COLORS.gray,
    fontSize: 13,
  },

  bottomRow: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent:
      'space-between',
    alignItems: 'center',
  },

  price: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.primary,
  },

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  rating: {
    marginLeft: 5,
    fontWeight: '700',
    color: COLORS.text,
  },

  statusRow: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },

  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    marginRight: 8,
  },

  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.gray,
  },

});