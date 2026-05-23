import {
    View,
    Text,
   StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
    SafeAreaView
  } from 'react-native';
  
  import { Ionicons } from '@expo/vector-icons';
  
  import MainLayout from '../components/MainLayout';
  import { SALONS } from '../data/salons';
  
  export default function CategoryScreen({ route, navigation }) {
  
    const { category } = route.params;
  
    const filteredSalons = SALONS.filter(
      salon =>
        salon.service.toLowerCase().includes(
          category.toLowerCase()
        )
    );
  
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
              name="heart-outline"
              size={16}
              color="#333"
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
  
          {/* HEADER */}
          <Text style={styles.header}>
            {category}
          </Text>
  
          {/* EMPTY */}
          {filteredSalons.length === 0 ? (
  
            <View style={styles.empty}>
  
              <Ionicons
                name="search-outline"
                size={70}
                color="#C4B5FD"
              />
  
              <Text style={styles.emptyTitle}>
                No salons found
              </Text>
  
              <Text style={styles.emptyText}>
                No salons available in this category.
              </Text>
  
            </View>
  
          ) : (
  
            <FlatList
              data={filteredSalons}
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
    header: {
      fontSize: 24,
      fontWeight: '900',
      marginTop: 10,
      marginBottom: 20,
      marginLeft: 5,
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
  
  });