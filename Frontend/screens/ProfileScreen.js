import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Switch,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import MainLayout from '../components/MainLayout';
import PrimaryButton from '../components/PrimaryButton';

import {
  useState,
  useEffect,
} from 'react';

import { COLORS } from '../constants/colors';

import {
  getUserData,
  logoutUser,
} from '../services/auth';

export default function ProfileScreen({
  navigation,
}) {

  const [notifications,
    setNotifications] =
      useState(true);

  const [user,
    setUser] =
      useState(null);

  useEffect(() => {

    const loadUser = async () => {

      const userData =
        await getUserData();

      setUser(userData);

    };

    loadUser();

  }, []);

  const handleLogout = async () => {

    await logoutUser();

    navigation.replace(
      'Landing'
    );

  };

  return (

    <MainLayout navigation={navigation}>

      <View style={styles.container}>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 30,
          }}
        >

          {/* TOP SECTION */}
          <View style={styles.topSection}>

            <View style={styles.avatarWrapper}>

              <Image
                source={{
                  uri:
                    'https://randomuser.me/api/portraits/men/32.jpg',
                }}
                style={styles.avatar}
              />

              <TouchableOpacity
                style={styles.editAvatarBtn}
              >

                <Ionicons
                  name="camera"
                  size={15}
                  color={COLORS.white}
                />

              </TouchableOpacity>

            </View>

            <Text style={styles.name}>

              {user?.name
                ? user.name.toUpperCase()
                : 'USER'}

            </Text>

            <Text style={styles.email}>

              {user?.email ||
                'No email'}

            </Text>

          </View>

          {/* ACCOUNT */}
          <View style={styles.card}>

            <Text style={styles.cardTitle}>
              Account
            </Text>

            <TouchableOpacity
              style={styles.row}
              onPress={() =>
                navigation.navigate(
                  'Bookings'
                )
              }
            >

              <View style={styles.rowLeft}>

                <Ionicons
                  name="calendar-outline"
                  size={20}
                  color={COLORS.primary}
                />

                <Text style={styles.rowText}>
                  My Bookings
                </Text>

              </View>

              <Ionicons
                name="chevron-forward"
                size={18}
                color={
                  COLORS.lightGray
                }
              />

            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity
              style={styles.row}
              onPress={() =>
                navigation.navigate(
                  'Favorites'
                )
              }
            >

              <View style={styles.rowLeft}>

                <Ionicons
                  name="heart-outline"
                  size={20}
                  color={COLORS.primary}
                />

                <Text style={styles.rowText}>
                  Favorites
                </Text>

              </View>

              <Ionicons
                name="chevron-forward"
                size={18}
                color={
                  COLORS.lightGray
                }
              />

            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity
              style={styles.row}
              onPress={() =>
                navigation.navigate(
                  'EditProfile'
                )
              }
            >

              <View style={styles.rowLeft}>

                <Ionicons
                  name="person-outline"
                  size={20}
                  color={COLORS.primary}
                />

                <Text style={styles.rowText}>
                  Edit Profile
                </Text>

              </View>

              <Ionicons
                name="chevron-forward"
                size={18}
                color={
                  COLORS.lightGray
                }
              />

            </TouchableOpacity>

          </View>

          {/* PREFERENCES */}
          <View style={styles.card}>

            <Text style={styles.cardTitle}>
              Preferences
            </Text>

            <View style={styles.row}>

              <View style={styles.rowLeft}>

                <Ionicons
                  name="notifications-outline"
                  size={20}
                  color={COLORS.primary}
                />

                <Text style={styles.rowText}>
                  Notifications
                </Text>

              </View>

              <Switch
                value={notifications}
                onValueChange={
                  setNotifications
                }
                trackColor={{
                  false: '#ccc',
                  true: '#C4B5FD',
                }}
                thumbColor={
                  notifications
                    ? COLORS.primary
                    : '#f4f3f4'
                }
              />

            </View>

          </View>

          {/* SUPPORT */}
          <View style={styles.card}>

            <Text style={styles.cardTitle}>
              Support
            </Text>

            <TouchableOpacity
              style={styles.row}
              onPress={() =>
                navigation.navigate(
                  'HelpCenter'
                )
              }
            >

              <View style={styles.rowLeft}>

                <Ionicons
                  name="help-circle-outline"
                  size={20}
                  color={COLORS.primary}
                />

                <Text style={styles.rowText}>
                  Help Center
                </Text>

              </View>

              <Ionicons
                name="chevron-forward"
                size={18}
                color={
                  COLORS.lightGray
                }
              />

            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity
              style={styles.row}
              onPress={() =>
                navigation.navigate(
                  'Terms'
                )
              }
            >

              <View style={styles.rowLeft}>

                <Ionicons
                  name="document-text-outline"
                  size={20}
                  color={COLORS.primary}
                />

                <Text style={styles.rowText}>
                  Terms & Privacy
                </Text>

              </View>

              <Ionicons
                name="chevron-forward"
                size={18}
                color={
                  COLORS.lightGray
                }
              />

            </TouchableOpacity>

          </View>

          {/* LOGOUT */}
          <View style={styles.logoutWrapper}>

            <PrimaryButton
              title="Logout"
              bordered
              backgroundColor={
                COLORS.danger
              }
              textColor={
                COLORS.danger
              }
              onPress={handleLogout}
            />

          </View>

        </ScrollView>

      </View>

    </MainLayout>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor:
      COLORS.background,
  },

  topSection: {
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 22,
  },

  avatarWrapper: {
    position: 'relative',
  },

  avatar: {
    width: 92,
    height: 92,
    borderRadius: 50,
  },

  editAvatarBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor:
      COLORS.primary,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  name: {
    fontSize: 22,
    fontWeight: '800',
    marginTop: 12,
    color: COLORS.text,
  },

  email: {
    fontSize: 13,
    color: COLORS.gray,
    marginTop: 4,
  },

  card: {
    backgroundColor:
      COLORS.white,
    marginHorizontal: 20,
    borderRadius: 18,
    paddingVertical: 10,
    marginBottom: 18,
  },

  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 10,
    paddingHorizontal: 18,
    marginTop: 5,
  },

  row: {
    flexDirection: 'row',
    justifyContent:
      'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 14,
  },

  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  rowText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 12,
    color: COLORS.text,
  },

  divider: {
    height: 1,
    backgroundColor: '#EFEFEF',
    marginHorizontal: 18,
  },

  logoutWrapper: {
    marginHorizontal: 20,
    marginTop: 10,
  },

});