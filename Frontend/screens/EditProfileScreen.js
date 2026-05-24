import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  Modal,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import PrimaryButton from '../components/PrimaryButton';
import SuccessModal from '../components/SuccessModal';
export default function EditProfileScreen({ navigation }) {

  const [saved, setSaved] = useState(false);

  const handleSave = () => {

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
      navigation.goBack();
    }, 1800);

  };

  return (

    <SafeAreaView style={styles.container}>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 40
        }}
      >

        {/* HEADER */}
        <View style={styles.headerRow}>

          <TouchableOpacity
            onPress={() => navigation.goBack()}
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color="#111"
            />
          </TouchableOpacity>

          <Text style={styles.header}>
            Edit Profile
          </Text>

          <View style={{ width: 24 }} />

        </View>

        {/* PROFILE IMAGE */}
        <View style={styles.imageSection}>

          <View style={styles.avatarWrapper}>

            <Image
              source={{
                uri: 'https://randomuser.me/api/portraits/men/32.jpg'
              }}
              style={styles.avatar}
            />

            <TouchableOpacity style={styles.cameraBtn}>

              <Ionicons
                name="camera"
                size={15}
                color="#fff"
              />

            </TouchableOpacity>

          </View>

        </View>

        {/* FORM CARD */}
        <View style={styles.formCard}>

          {/* NAME */}
          <View style={styles.inputGroup}>

            <Text style={styles.label}>
              Full Name
            </Text>

            <TextInput
              defaultValue="Puneeth"
              placeholder="Enter name"
              placeholderTextColor="#999"
              style={styles.input}
            />

          </View>

          {/* EMAIL */}
          <View style={styles.inputGroup}>

            <Text style={styles.label}>
              Email
            </Text>

            <TextInput
              defaultValue="puneeth@email.com"
              placeholder="Enter email"
              placeholderTextColor="#999"
              style={styles.input}
            />

          </View>

          {/* PHONE */}
          <View style={styles.inputGroup}>

            <Text style={styles.label}>
              Phone Number
            </Text>

            <TextInput
              defaultValue="+91 9876543210"
              placeholder="Enter phone"
              placeholderTextColor="#999"
              style={styles.input}
            />

          </View>

          {/* LOCATION */}
          <View style={styles.inputGroup}>

            <Text style={styles.label}>
              Location
            </Text>

            <TextInput
              defaultValue="Bangalore"
              placeholder="Enter location"
              placeholderTextColor="#999"
              style={styles.input}
            />

          </View>

        </View>

        {/* BUTTON */}
        <PrimaryButton
          title="Save Changes"
          onPress={() => setSaved(true)}
        />

      </ScrollView>

      {/* SUCCESS MODAL */}
      <SuccessModal
        visible={saved}
        title="Profile Updated"
        onClose={() => {
          setSaved(false);
          navigation.goBack();
        }}
      />

    </SafeAreaView>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingHorizontal: 15,
    margin:20,
    marginBottom:0,
  },

  /* HEADER */
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 25,
  },

  header: {
    fontSize: 24,
    fontWeight: '900',
    color: '#111',
  },

  /* IMAGE */
  imageSection: {
    alignItems: 'center',
    marginBottom: 22,
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
    backgroundColor: '#7C3AED',
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* FORM */
  formCard: {
    backgroundColor: '#EDEBFF',
    borderRadius: 20,
    padding: 16,
  },

  inputGroup: {
    marginBottom: 14,
  },

  label: {
    fontSize: 12,
    fontWeight: '700',
    color: '#555',
    marginBottom: 7,
    marginLeft: 3,
  },

  input: {
    height: 48,
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingHorizontal: 14,
    fontSize: 13,
    color: '#111',
    fontWeight: '500',
  },

  /* BUTTON */
  saveBtn: {
    height: 54,
    backgroundColor: '#7C3AED',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },

  saveText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },

  /* MODAL */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalBox: {
    width: '72%',
    backgroundColor: '#fff',
    borderRadius: 24,
    paddingVertical: 30,
    alignItems: 'center',
  },

  modalText: {
    marginTop: 14,
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
  },

});