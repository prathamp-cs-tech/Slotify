// screens/AddServiceScreen.js

import { useState,useEffect} from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';

import {
  Ionicons,
} from '@expo/vector-icons';

import * as ImagePicker
  from 'expo-image-picker';

import ProviderLayout from '../components/ProviderLayout';

import PrimaryButton from '../components/PrimaryButton';

import API from '../services/api';

import { COLORS } from '../constants/colors';

const CATEGORIES = [
  'Hair',
  'Beard',
  'Facial',
  'Makeup',
  'Spa',
];


export default function AddServiceScreen({
  navigation,
}) {
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
  
        setSalon(
          response.data
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
  const [image, setImage] =
  useState('');

  const [uploading,
  setUploading] =
  useState(false);

  const [name, setName] =
    useState('');

  const [category, setCategory] =
    useState('Hair');

  const [price, setPrice] =
    useState('');

  const [duration, setDuration] =
    useState('');
  const [salon, setSalon] =
    useState(null);
  const [loading, setLoading] =
    useState(false);

  const handleAddService =
    async () => {

      if (
        !name ||
        !price ||
        !duration
      ) {

        Alert.alert(
          'Error',
          'Please fill all fields'
        );

        return;

      }

      try {

        setLoading(true);

        await API.post(
          '/provider/services',
          {
            name,
            category,
            price:
              Number(price),
            duration:
              Number(duration),
            image:
              image||salon.image,
          }
        );

        Alert.alert(
          'Success',
          'Service added successfully'
        );

        navigation.goBack();

      } catch (error) {

        console.log(error);

        Alert.alert(
          'Error',
          error.response?.data
            ?.message ||
            'Something went wrong'
        );

      } finally {

        setLoading(false);

      }

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
          name: 'service.jpg',
        }
      );

      const response =
        await API.post(
          '/upload',
          formData,
          {
            headers: {
              'Content-Type':
                'multipart/form-data',
            },
          }
        );
        console.log(

          'UPLOAD RESPONSE:',
        
          response.data
        
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

  return (

    <ProviderLayout
      navigation={navigation}
    >

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >

        <Text style={styles.title}>
          Add New Service
        </Text>

        <Image
          source={{
            uri:
              image ||
              salon?.image,
          }}
          style={styles.preview}
        />
        <TouchableOpacity
          style={styles.imageBtn}
          onPress={pickImage}
          disabled={uploading}
        >

          <Ionicons
            name="image-outline"
            size={20}
            color={COLORS.primary}
          />

          <Text style={styles.imageBtnText}>
            {
              uploading
                ? 'Uploading...'
                : image
                ? 'Change Service Image'
                : 'Choose Service Image'
            }
          </Text>

        </TouchableOpacity>

        <Text style={styles.label}>
          Service Name
        </Text>

        <View style={styles.inputBox}>

          <Ionicons
            name="cut-outline"
            size={18}
            color="#777"
          />

          <TextInput
            style={styles.input}
            placeholder="Enter service name"
            value={name}
            onChangeText={setName}
          />

        </View>

        <Text style={styles.label}>
          Category
        </Text>

        <View style={styles.categories}>

          {CATEGORIES.map(cat => (

            <TouchableOpacity
              key={cat}
              style={[

                styles.categoryBtn,

                category === cat &&
                styles.activeCategory,

              ]}
              onPress={() =>
                setCategory(cat)
              }
            >

              <Text
                style={[

                  styles.categoryText,

                  category === cat &&
                  styles.activeCategoryText,

                ]}
              >
                {cat}
              </Text>

            </TouchableOpacity>

          ))}

        </View>

        <Text style={styles.label}>
          Price
        </Text>

        <View style={styles.inputBox}>

          <Ionicons
            name="cash-outline"
            size={18}
            color="#777"
          />

          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Enter price"
            value={price}
            onChangeText={setPrice}
          />

        </View>

        <Text style={styles.label}>
          Duration (mins)
        </Text>

        <View style={styles.inputBox}>

          <Ionicons
            name="time-outline"
            size={18}
            color="#777"
          />

          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Enter duration"
            value={duration}
            onChangeText={setDuration}
          />

        </View>


        <PrimaryButton
          title={
            uploading
              ? 'Uploading Image...'
              : loading
              ? 'ADDING...'
              : 'Add Service'
          }
          onPress={handleAddService}
          disabled={
            uploading ||
            loading
          }
        />

        <View
          style={{ height: 100 }}
        />

      </ScrollView>

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

  title: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.text,
    marginBottom: 20,
  },

  preview: {
    width: '100%',
    height: 220,
    borderRadius: 20,
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 10,
  },

  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:
      COLORS.card,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 15,
    marginBottom: 18,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    color: COLORS.text,
  },

  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },

  categoryBtn: {
    backgroundColor:
      COLORS.card,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 30,
    marginRight: 10,
    marginBottom: 10,
  },

  activeCategory: {
    backgroundColor:
      COLORS.primary,
  },

  categoryText: {
    color: COLORS.text,
    fontWeight: '700',
  },

  activeCategoryText: {
    color: COLORS.white,
  },
  imageBtn: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 16,
    paddingVertical: 14,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  imageBtnText: {
    color: COLORS.primary,
    fontWeight: '700',
    marginLeft: 8,
  },

});