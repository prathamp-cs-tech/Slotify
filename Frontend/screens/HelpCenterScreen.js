import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
 ScrollView,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import PrimaryButton from '../components/PrimaryButton';
import SuccessModal from '../components/SuccessModal';

import { COLORS } from '../constants/colors';

export default function EditProfileScreen({ navigation }) {

  const [saved, setSaved] = useState(false);

  return (

    <View style={styles.container}>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 40,
        }}
      >

        <View style={styles.headerRow}>

          <TouchableOpacity
            onPress={() => navigation.goBack()}
          >

            <Ionicons
              name="arrow-back"
              size={24}
              color={COLORS.text}
            />

          </TouchableOpacity>

          <Text style={styles.header}>
            Edit Profile
          </Text>

          <View style={{ width: 24 }} />

        </View>

        <View style={styles.imageSection}>

          <View style={styles.avatarWrapper}>

            <Image
              source={{
                uri: 'https://randomuser.me/api/portraits/men/32.jpg',
              }}
              style={styles.avatar}
            />

            <TouchableOpacity style={styles.cameraBtn}>

              <Ionicons
                name="camera"
                size={15}
                color={COLORS.white}
              />

            </TouchableOpacity>

          </View>

        </View>

        <View style={styles.formCard}>

          <View style={styles.inputGroup}>

            <Text style={styles.label}>
              Full Name
            </Text>

            <TextInput
              defaultValue="Puneeth"
              placeholder="Enter name"
              placeholderTextColor={COLORS.lightGray}
              style={styles.input}
            />

          </View>

          <View style={styles.inputGroup}>

            <Text style={styles.label}>
              Email
            </Text>

            <TextInput
              defaultValue="puneeth@email.com"
              placeholder="Enter email"
              placeholderTextColor={COLORS.lightGray}
              style={styles.input}
            />

          </View>

          <View style={styles.inputGroup}>

            <Text style={styles.label}>
              Phone Number
            </Text>

            <TextInput
              defaultValue="+91 9876543210"
              placeholder="Enter phone"
              placeholderTextColor={COLORS.lightGray}
              style={styles.input}
            />

          </View>

          <View style={styles.inputGroup}>

            <Text style={styles.label}>
              Location
            </Text>

            <TextInput
              defaultValue="Bangalore"
              placeholder="Enter location"
              placeholderTextColor={COLORS.lightGray}
              style={styles.input}
            />

          </View>

        </View>

        <View style={styles.buttonWrapper}>

          <PrimaryButton
            title="Save Changes"
            onPress={() => setSaved(true)}
          />

        </View>

      </ScrollView>

      <SuccessModal
        visible={saved}
        title="Profile Updated"
        onClose={() => {
          setSaved(false);
          navigation.goBack();
        }}
      />

    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 25,
  },

  header: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.text,
  },

  imageSection: {
    alignItems: 'center',
    marginBottom: 24,
  },

  avatarWrapper: {
    position: 'relative',
  },

  avatar: {
    width: 95,
    height: 95,
    borderRadius: 48,
  },

  cameraBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  formCard: {
    backgroundColor: COLORS.card,
    borderRadius: 22,
    padding: 16,
  },

  inputGroup: {
    marginBottom: 14,
  },

  label: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.gray,
    marginBottom: 7,
    marginLeft: 3,
  },

  input: {
    height: 50,
    backgroundColor: COLORS.white,
    borderRadius: 14,
    paddingHorizontal: 14,
    fontSize: 13,
    color: COLORS.text,
    fontWeight: '500',
  },

  buttonWrapper: {
    marginTop: 22,
  },

});