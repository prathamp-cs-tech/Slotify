import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
  } from 'react-native';
  
  import { Ionicons } from '@expo/vector-icons';
  import { COLORS } from '../constants/colors';
  import { useState } from 'react';
  
  export default function SalonCard({ salon, navigation }) {
    const [liked, setLiked] = useState(false);
    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.9}
        onPress={() =>
          navigation.navigate('Salon', {
            salon,
          })
        }
      >
        <View>
          <Image
            source={{ uri: salon.image }}
            style={styles.image}
          />
  
          <TouchableOpacity style={styles.heart} onPress={() => setLiked(!liked)}>
            <Ionicons
              name={liked ? "heart" : "heart-outline"}
              size={16}
              color={liked ? COLORS.primary : "#333"}
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
      
      cardBody: {
        padding: 10,
      },
      
      name: {
        fontSize: 14,
        fontWeight: '700',
      },
      
      service: {
        fontSize: 12,
        color: '#666',
        marginTop: 4,
        marginBottom: 8,
        fontWeight: '500',
      },
      
      row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
      },
    heart: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    price: {
      fontSize: 13,
      fontWeight: '700',
      color: COLORS.primary,
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
  });