import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
  } from 'react-native';
  
import {
    useEffect,
    useState,
    useCallback
} from 'react';
  
import {
    useFocusEffect,
} from '@react-navigation/native';

import ProviderLayout from '../components/ProviderLayout';
  
import API from '../services/api';

import PrimaryButton from '../components/PrimaryButton';
  
  import {
    COLORS,
  } from '../constants/colors';
  
  export default function ManageServicesScreen({
    navigation,
  }) {
  
    const [services,
      setServices] =
        useState([]);
  
    const [salon,
      setSalon] =
        useState(null);
  
    useFocusEffect(useCallback(() => {
  
      fetchSalon();
  
    }, []));
  
    const fetchSalon =
      async () => {
  
        try {
  
          const response =
            await API.get(
              '/provider/my-salon'
            );
  
          setSalon(
            response.data
          );
  
          setServices(
            response.data.services || []
          );
  
        } catch (error) {
  
          console.log(error);
  
        }
  
      };
  
    const renderItem =
      ({ item }) => (
  
        <View style={styles.card}>
  
          <View>
  
            <Text style={styles.name}>
              {item.name}
            </Text>
  
            <Text style={styles.price}>
              ₹{item.price}
            </Text>
            <Text
                style={{
                    color:
                    item.isActive
                        ? 'green'
                        : COLORS.danger,
                    marginTop: 4,
                    fontWeight: '600',
                }}
                >
                {item.isActive
                    ? 'Active'
                    : 'Inactive'}
            </Text>
  
          </View>
  
          <TouchableOpacity
  
            style={styles.editBtn}
  
            onPress={() =>
  
              navigation.navigate(
                'EditService',
                {
                  salon,
                  service: item,
                }
              )
  
            }
          >
  
            <Text style={styles.editText}>
              Edit
            </Text>
  
          </TouchableOpacity>
  
        </View>
  
      );
  
    return (
  
      <ProviderLayout
        navigation={navigation}
      >
  
        <View style={styles.container}>
  
          <Text style={styles.header}>
            Manage Services
          </Text>
          <PrimaryButton
            title="Add New Service"
            onPress={() =>
                navigation.navigate(
                'AddService'
                )
            }
            />
            <View
                style={{
                    height: 16,
                }}
            />
  
          <FlatList
  
            data={services}
  
            keyExtractor={(item) =>
              item._id
            }
  
            renderItem={renderItem}
  
            contentContainerStyle={{
              paddingBottom: 120,
            }}
  
          />
  
        </View>
  
      </ProviderLayout>
  
    );
  
  }
  
  const styles =
    StyleSheet.create({
  
      container: {
        flex: 1,
        padding: 20,
        backgroundColor:
          COLORS.background,
      },
  
      header: {
        fontSize: 24,
        fontWeight: '900',
        marginBottom: 20,
        color: COLORS.text,
      },
  
      card: {
        backgroundColor:
          COLORS.white,
        padding: 18,
        borderRadius: 18,
        marginBottom: 14,
        flexDirection: 'row',
        justifyContent:
          'space-between',
        alignItems: 'center',
      },
  
      name: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.text,
      },
  
      price: {
        marginTop: 4,
        color: COLORS.gray,
      },
  
      editBtn: {
        backgroundColor:
          COLORS.primary,
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 12,
      },
  
      editText: {
        color: COLORS.white,
        fontWeight: '700',
      },
  
    });