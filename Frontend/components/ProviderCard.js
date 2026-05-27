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
            'EditService',
            {
              salon,
            }
          )
        }
      >
  
        <Image
          source={{ uri: salon.image }}
          style={styles.image}
        />
  
        <View style={styles.info}>
  
          <View style={styles.topRow}>
  
            <View style={{ flex: 1 }}>
  
              <Text
                style={styles.name}
                numberOfLines={1}
              >
                {salon.name}
              </Text>
  
              <Text style={styles.service}>
                {salon.service}
              </Text>
  
            </View>
  
            <View style={styles.ratingBox}>
  
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
  
          <View style={styles.bottomRow}>
  
            <View>
  
              <Text style={styles.price}>
                ₹{salon.price}
              </Text>
  
            </View>
  
            <View style={styles.rightRow}>
  
              <View style={styles.statusBox}>
  
                <View style={styles.dot} />
  
                <Text style={styles.status}>
                  ACTIVE
                </Text>
  
              </View>
  
              <View style={styles.editBtn}>
  
                <Ionicons
                  name="create-outline"
                  size={13}
                  color={COLORS.primary}
                />
  
              </View>
  
            </View>
  
          </View>
  
        </View>
  
      </TouchableOpacity>
  
    );
  
  }
  
  const styles = StyleSheet.create({
  
    card: {
      backgroundColor: COLORS.white,
      borderRadius: 20,
      marginBottom: 16,
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
      height: 115,
      borderWidth: 1,
      borderColor: '#ECE8FF',
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
  
    topRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
  
    name: {
      fontSize: 17,
      fontWeight: '800',
      color: COLORS.text,
      paddingRight: 10,
    },
  
    service: {
      marginTop: 4,
      fontSize: 13,
      color: COLORS.gray,
      fontWeight: '500',
    },
  
    ratingBox: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#FEF3C7',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 10,
    },
  
    rating: {
      marginLeft: 4,
      fontSize: 11,
      fontWeight: '700',
      color: '#92400E',
    },
  
    bottomRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 14,
    },
  
    price: {
      fontSize: 21,
      fontWeight: '900',
      color: COLORS.primary,
    },
  
    rightRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  
    statusBox: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingVertical: 5,
      backgroundColor: '#F0FDF4',
      borderRadius: 20,
      marginRight: 8,
    },
  
    dot: {
      width: 7,
      height: 7,
      borderRadius: 4,
      backgroundColor: '#22C55E',
      marginRight: 6,
    },
  
    status: {
      fontSize: 10,
      fontWeight: '800',
      color: '#15803D',
      letterSpacing: 0.8,
    },
  
    editBtn: {
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: COLORS.card,
      justifyContent: 'center',
      alignItems: 'center',
    },
  
  });