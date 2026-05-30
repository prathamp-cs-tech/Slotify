import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Alert,
    Image,
    ScrollView,
    TouchableOpacity,
  } from 'react-native';
  
import {
    useEffect,
    useState,
} from 'react';
  
import ProviderLayout
    from '../components/ProviderLayout';
  
import PrimaryButton from '../components/PrimaryButton';
  
import API from '../services/api';
  
import {
    COLORS,
} from '../constants/colors';

import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
  
  export default function EditSalonDetailsScreen({
    navigation,
  }) {
  
    const [name,
      setName] =
        useState('');
  
    const [address,
      setAddress] =
        useState('');
  
    const [image,
      setImage] =
        useState('');
  
    const [mapLink,
      setMapLink] =
        useState('');
    const [uploading,
        setUploading] =
            useState(false);
  
    useEffect(() => {
  
      fetchSalon();
  
    }, []);
  
    const fetchSalon =
      async () => {
  
        try {
  
          const response =
            await API.get(
              '/provider/my-salon'
            );
  
          setName(
            response.data.name || ''
          );
  
          setAddress(
            response.data.address || ''
          );
  
          setImage(
            response.data.image || ''
          );
  
          setMapLink(
            response.data.mapLink || ''
          );
  
        } catch (error) {
  
          console.log(error);
  
        }
  
      };
const pickImage =
  async () => {

    const result =
      await ImagePicker.launchImageLibraryAsync({

        mediaTypes:
          ImagePicker.MediaTypeOptions.Images,

        allowsEditing: true,

        quality: 0.8,

      });

    if (
      result.canceled
    ) return;

    uploadImage(
      result.assets[0].uri
    );

  };
const uploadImage =
  async (uri) => {

    try {

      setUploading(true);

      const formData =
        new FormData();

      formData.append(
        'image',
        {
          uri,
          type: 'image/jpeg',
          name: 'salon.jpg',
        }
      );

      const response =
        await API.post(
          '/upload',
          formData
        );

      setImage(
        response.data.image
      );

    } catch (error) {

      console.log(error);

      Alert.alert(
        'Error',
        'Image upload failed'
      );

    } finally {

      setUploading(false);

    }

  };
  
    const saveSalon =
      async () => {
  
        try {
  
          await API.put(
            '/provider/my-salon',
            {
              name,
              address,
              image,
              mapLink,
            }
          );
  
          Alert.alert(
            'Success',
            'Salon updated successfully'
          );
  
          navigation.goBack();
  
        } catch (error) {
  
          console.log(error);
  
          Alert.alert(
            'Error',
            error.response?.data?.message ||
            'Failed to update salon'
          );
  
        }
  
      };
  
    return (
  
      <ProviderLayout
        navigation={navigation}
      >
  
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 120,
          }}
        >
  
          <Text style={styles.header}>
            Edit Salon Details
          </Text>
  
          <Text style={styles.subHeader}>
            Update your salon information
          </Text>
  
          <Text style={styles.label}>
            Salon Image
          </Text>
  
          {image ? (
            <View>
                <Image
                source={{
                    uri: image,
                }} 
                style={styles.salonImage} 
                resizeMode="cover"
                />
            <TouchableOpacity
                style={styles.changeImageBtn}
                onPress={pickImage}
                disabled={uploading}
                >

                <Ionicons
                    name="camera-outline"
                    size={18}
                    color={COLORS.primary}
                />

                <Text style={styles.changeImageText}>

                    {uploading
                    ? 'Uploading...'
                    : 'Change Image'}

                </Text>

                </TouchableOpacity>
            </View>
  
          ) : (
  
            <View
              style={
                styles.imagePlaceholder
              }
            >
  
              <Text
                style={
                  styles.placeholderText
                }
              >
                No Image Available
              </Text>
  
            </View>
  
          )}
  
          <Text style={styles.label}>
            Salon Name
          </Text>
  
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter salon name"
            placeholderTextColor="#999"
          />
  
          <Text style={styles.label}>
            Address
          </Text>
  
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
            placeholder="Enter salon address"
            placeholderTextColor="#999"
          />
  
          <Text style={styles.label}>
            Google Maps Link
          </Text>
  
          <TextInput
            style={styles.input}
            value={mapLink}
            onChangeText={setMapLink}
            placeholder="Paste Google Maps link"
            placeholderTextColor="#999"
          />
  
          <PrimaryButton
            title="Save Changes"
            onPress={saveSalon}
          />
  
        </ScrollView>
  
      </ProviderLayout>
  
    );
  
  }
  
  const styles =
    StyleSheet.create({
  
      container: {
        flex: 1,
        backgroundColor:
          COLORS.background,
        paddingHorizontal: 20,
      },
  
      header: {
        fontSize: 24,
        fontWeight: '900',
        marginTop: 20,
        color: COLORS.text,
      },
  
      subHeader: {
        fontSize: 13,
        color: COLORS.gray,
        marginTop: 4,
        marginBottom: 20,
      },
  
      salonImage: {
        width: '100%',
        height: 220,
        borderRadius: 18,
        marginBottom: 20,
      },
  
      imagePlaceholder: {
        width: '100%',
        height: 220,
        borderRadius: 18,
        backgroundColor:
          COLORS.card,
        justifyContent:
          'center',
        alignItems:
          'center',
        marginBottom: 20,
      },
  
      placeholderText: {
        color: COLORS.gray,
        fontWeight: '600',
      },
  
      label: {
        fontSize: 14,
        fontWeight: '700',
        color: COLORS.text,
        marginBottom: 8,
        marginTop: 6,
      },
  
      input: {
        backgroundColor:
          COLORS.white,
        borderRadius: 14,
        padding: 14,
        marginBottom: 14,
        color: COLORS.text,
      },

      changeImageBtn: {
        height: 50,
        borderWidth: 1.5,
        borderColor: COLORS.primary,
        borderRadius: 14,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
      },
      
      changeImageText: {
        color: COLORS.primary,
        fontWeight: '700',
        fontSize: 15,
        marginLeft: 8,
      },
  
    });