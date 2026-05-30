import {
    useState,
    useEffect,
  } from 'react';
  
  import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
  } from 'react-native';
  
  import {
    Ionicons,
  } from '@expo/vector-icons';
  
  import ProviderLayout
    from '../components/ProviderLayout';
  
  import API
    from '../services/api';
  
  import {
    COLORS,
  } from '../constants/colors';
  
  export default function ProviderNotificationsScreen({
    navigation,
  }) {
  
    const [
      notifications,
      setNotifications,
    ] = useState([]);
  
    const [
      loading,
      setLoading,
    ] = useState(true);
  
    useEffect(() => {
  
      fetchNotifications();
  
    }, []);
  
    const fetchNotifications =
      async () => {
  
        try {
  
          setLoading(true);
  
          const response =
            await API.get(
              '/notifications/provider'
            );
  
          setNotifications(
            response.data
          );
  
        } catch (error) {
  
          console.log(error);
  
        } finally {
  
          setLoading(false);
  
        }
  
      };
  
    const renderItem =
      ({ item }) => (
  
        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.8}
        >
  
          <View style={styles.iconBox}>
  
            <Ionicons
              name="notifications"
              size={22}
              color={COLORS.white}
            />
  
          </View>
  
          <View style={styles.content}>
  
            <Text style={styles.title}>
              {item.title}
            </Text>
  
            <Text style={styles.message}>
              {item.message}
            </Text>
  
          </View>
  
        </TouchableOpacity>
  
      );
  
    return (
  
      <ProviderLayout
        navigation={navigation}
        active="notifications"
      >
  
        <View style={styles.container}>
  
          <Text style={styles.header}>
            Updates
          </Text>
  
          {loading ? (
  
            <Text style={styles.empty}>
              Loading...
            </Text>
  
          ) : notifications.length === 0 ? (
  
            <Text style={styles.empty}>
              No notifications found
            </Text>
  
          ) : (
  
            <FlatList
  
              data={notifications}
  
              keyExtractor={(item) =>
                item._id
              }
  
              renderItem={renderItem}
  
              showsVerticalScrollIndicator={false}
  
              contentContainerStyle={{
                paddingBottom: 120,
              }}
  
            />
  
          )}
  
        </View>
  
      </ProviderLayout>
  
    );
  
  }
  
  const styles = StyleSheet.create({
  
    container: {
      flex: 1,
      backgroundColor:
        COLORS.background,
      padding: 20,
    },
  
    header: {
      fontSize: 28,
      fontWeight: '900',
      color: COLORS.text,
      marginBottom: 20,
    },
  
    card: {
      backgroundColor:
        COLORS.white,
      borderRadius: 18,
      padding: 16,
      marginBottom: 14,
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
  
    iconBox: {
      width: 50,
      height: 50,
      borderRadius: 14,
      backgroundColor:
        COLORS.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 14,
    },
  
    content: {
      flex: 1,
    },
  
    title: {
      fontSize: 15,
      fontWeight: '800',
      color: COLORS.text,
      marginBottom: 6,
    },
  
    message: {
      fontSize: 13,
      color: COLORS.gray,
      lineHeight: 20,
    },
  
    empty: {
      marginTop: 40,
      textAlign: 'center',
      color: COLORS.gray,
      fontSize: 15,
      fontWeight: '600',
    },
  
  });