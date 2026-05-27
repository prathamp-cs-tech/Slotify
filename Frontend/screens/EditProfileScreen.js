import {
  useState,
  useEffect,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  Alert,
} from 'react-native';

import {
  SafeAreaView,
} from 'react-native-safe-area-context';

import {
  Ionicons,
} from '@expo/vector-icons';

import PrimaryButton from '../components/PrimaryButton';

import SuccessModal from '../components/SuccessModal';

import {
  COLORS,
} from '../constants/colors';

import {
  getUserData,
  saveUserData,
  getToken,
} from '../services/auth';

import API from '../services/api';

export default function EditProfileScreen({
  navigation,
}) {

  const [saved,
    setSaved] =
      useState(false);

  const [loading,
    setLoading] =
      useState(false);

  const [name,
    setName] =
      useState('');

  const [email,
    setEmail] =
      useState('');

  const [phone,
    setPhone] =
      useState('');

  const [location,
    setLocation] =
      useState('');

  useEffect(() => {

    const loadUser = async () => {

      const user =
        await getUserData();

      if (user) {

        setName(
          user.name || ''
        );

        setEmail(
          user.email || ''
        );

        setPhone(
          user.phone || ''
        );

        setLocation(
          user.location || ''
        );

      }

    };

    loadUser();

  }, []);

  const handleSave = async () => {

    if (!name || !email) {

      Alert.alert(
        'Error',
        'Name and Email are required'
      );

      return;

    }

    try {

      setLoading(true);

      const token =
        await getToken();

      const response =
        await API.put(
          '/users/profile',
          {
            name,
            email,
            phone,
            location,
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      await saveUserData(
        token,
        response.data
      );

      setSaved(true);

    } catch (error) {

      console.log(error);

      Alert.alert(
        'Update Failed',
        error.response?.data
          ?.message ||
          'Something went wrong'
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <SafeAreaView
      style={styles.container}
    >

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 40,
        }}
      >

        {/* HEADER */}
        <View style={styles.headerRow}>

          <TouchableOpacity
            style={styles.backBtn}
            onPress={() =>
              navigation.goBack()
            }
          >

            <Ionicons
              name="arrow-back"
              size={22}
              color={COLORS.text}
            />

          </TouchableOpacity>

          <Text style={styles.header}>
            Edit Profile
          </Text>

          <View
            style={{
              width: 40,
            }}
          />

        </View>

        {/* PROFILE IMAGE */}
        <View style={styles.imageSection}>

          <View style={styles.avatarWrapper}>

            <Image
              source={{
                uri:
                  'https://randomuser.me/api/portraits/men/32.jpg',
              }}
              style={styles.avatar}
            />

            <TouchableOpacity
              style={styles.cameraBtn}
            >

              <Ionicons
                name="camera"
                size={16}
                color={COLORS.white}
              />

            </TouchableOpacity>

          </View>

          <Text style={styles.changePhoto}>
            Change Photo
          </Text>

        </View>

        {/* FORM */}
        <View style={styles.formCard}>

          {/* NAME */}
          <View style={styles.inputGroup}>

            <Text style={styles.label}>
              Full Name
            </Text>

            <View style={styles.inputWrapper}>

              <Ionicons
                name="person-outline"
                size={18}
                color={COLORS.gray}
              />

              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Enter name"
                placeholderTextColor="#999"
                style={styles.input}
              />

            </View>

          </View>

          {/* EMAIL */}
          <View style={styles.inputGroup}>

            <Text style={styles.label}>
              Email Address
            </Text>

            <View style={styles.inputWrapper}>

              <Ionicons
                name="mail-outline"
                size={18}
                color={COLORS.gray}
              />

              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Enter email"
                placeholderTextColor="#999"
                autoCapitalize="none"
                keyboardType="email-address"
                style={styles.input}
              />

            </View>

          </View>

          {/* PHONE */}
          <View style={styles.inputGroup}>

            <Text style={styles.label}>
              Phone Number
            </Text>

            <View style={styles.inputWrapper}>

              <Ionicons
                name="call-outline"
                size={18}
                color={COLORS.gray}
              />

              <TextInput
                value={phone}
                onChangeText={setPhone}
                placeholder="Enter phone"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
                style={styles.input}
              />

            </View>

          </View>

          {/* LOCATION */}
          <View style={styles.inputGroup}>

            <Text style={styles.label}>
              Location
            </Text>

            <View style={styles.inputWrapper}>

              <Ionicons
                name="location-outline"
                size={18}
                color={COLORS.gray}
              />

              <TextInput
                value={location}
                onChangeText={setLocation}
                placeholder="Enter location"
                placeholderTextColor="#999"
                style={styles.input}
              />

            </View>

          </View>

        </View>

        {/* BUTTON */}
        <View style={styles.buttonWrapper}>

          <PrimaryButton
            title={
              loading
                ? 'Saving...'
                : 'Save Changes'
            }
            onPress={handleSave}
          />

        </View>

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
    backgroundColor:
      COLORS.background,
    paddingHorizontal: 20,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent:
      'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },

  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor:
      COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },

  header: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.text,
  },

  imageSection: {
    alignItems: 'center',
    marginBottom: 28,
  },

  avatarWrapper: {
    position: 'relative',
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },

  cameraBtn: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor:
      COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor:
      COLORS.background,
  },

  changePhoto: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },

  formCard: {
    backgroundColor:
      COLORS.white,
    borderRadius: 24,
    padding: 18,
  },

  inputGroup: {
    marginBottom: 18,
  },

  label: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.gray,
    marginBottom: 8,
    marginLeft: 3,
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:
      COLORS.card,
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 54,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '500',
  },

  buttonWrapper: {
    marginTop: 24,
    marginBottom: 20,
  },

});