import {
  View,
  Text,
 StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

export default function ProviderCard({
  salon,
  navigation,
}) {

  return (

    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.95}
      onPress={() =>
        navigation.navigate(
          'SalonDetails', {
            salon,
          }
        )
      }
    >

      {/* IMAGE */}
      <Image
        source={{ uri: salon.image }}
        style={styles.image}
      />

      {/* INFO */}
      <View style={styles.info}>

        {/* TOP */}
        <View style={styles.topRow}>

          <View style={{ flex: 1 }}>

            <Text
              style={styles.name}
              numberOfLines={1}
            >
              {salon.name}
            </Text>

            <Text style={styles.category}>
              {salon.service}
            </Text>

          </View>

        </View>

        {/* BOTTOM */}
        <View style={styles.bottomRow}>

          <View>

            <Text style={styles.label}>
              PRICE
            </Text>

            <Text style={styles.price}>
              ₹{salon.price}
            </Text>

          </View>

          <View style={styles.statusBox}>

            <View style={styles.dot} />

            <Text style={styles.status}>
              ACTIVE
            </Text>

          </View>

          <View style={styles.ratingRow}>
                <Ionicons
                    name="star"
                    size={12}
                    color={COLORS.warning}
                />
    
                <Text style={styles.rating}>
                    {salon.rating}
                </Text>
            </View>

        </View>

      </View>

    </TouchableOpacity>

  );
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 16,

    flexDirection: 'row',
    alignItems: 'center',

    padding: 12,
    height: 115,

    borderWidth: 1,
    borderColor: '#ECE8FF',

    position: 'relative',
  },

  image: {
    width: 82,
    height: 82,
    borderRadius: 16,
  },

  info: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'center',
  },

  name: {
    fontSize: 18,
    fontWeight: '800',
    color: '#18181B',
    paddingRight: 50,
  },

  service: {
    marginTop: 2,
    fontSize: 14,
    color: '#71717A',
    fontWeight: '500',
  },

  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  price: {
    fontSize: 22,
    fontWeight: '900',
    color: '#7C3AED',
    marginRight: 12,
  },

  statusBox: {
    left:10,
    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: 10,
    paddingVertical: 5,

    backgroundColor: '#F0FDF4',
    borderRadius: 20,
  },

  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#22C55E',
    marginRight: 6,
  },

  status: {
    fontSize: 11,
    fontWeight: '800',
    color: '#15803D',
    letterSpacing: 1,
  },

  ratingRow: {
      left:50,
      flexDirection: 'row',
      alignItems: 'center',
    },
  
    rating: {
      marginLeft: 3,
      fontSize: 12,
      color: '#555',
    },
});