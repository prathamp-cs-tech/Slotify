// screens/AddServiceScreen.js

import { useState } from 'react';

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

  const [name, setName] =
    useState('');

  const [category, setCategory] =
    useState('Hair');

  const [price, setPrice] =
    useState('');

  const [duration, setDuration] =
    useState('');

  const [image, setImage] =
    useState(
      'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f'
    );

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
            image,
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
          source={{ uri: image }}
          style={styles.preview}
        />

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

        <Text style={styles.label}>
          Image URL
        </Text>

        <View style={styles.inputBox}>

          <Ionicons
            name="image-outline"
            size={18}
            color="#777"
          />

          <TextInput
            style={styles.input}
            value={image}
            onChangeText={setImage}
          />

        </View>

        <PrimaryButton
          title={
            loading
              ? 'ADDING...'
              : 'Add Service'
          }
          onPress={handleAddService}
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

});