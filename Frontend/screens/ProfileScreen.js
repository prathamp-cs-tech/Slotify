import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    SafeAreaView,
    Switch,
  } from 'react-native';
  
  import { Ionicons } from '@expo/vector-icons';
  import MainLayout from '../components/MainLayout';
  import { useState } from 'react';
  import PrimaryButton from '../components/PrimaryButton';
  export default function ProfileScreen({ navigation }) {
  
    const [notifications, setNotifications] = useState(true);  
    return (
  
      <MainLayout navigation={navigation}>
  
        <SafeAreaView style={styles.container}>
  
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 120 }}
          >
  
            {/* TOP SECTION */}
            <View style={styles.topSection}>
  
              <View style={styles.avatarWrapper}>
  
                <Image
                  source={{
                    uri: 'https://randomuser.me/api/portraits/men/32.jpg'
                  }}
                  style={styles.avatar}
                />
  
                <TouchableOpacity style={styles.editAvatarBtn}>
                  <Ionicons
                    name="camera"
                    size={16}
                    color="#fff"
                  />
                </TouchableOpacity>
  
              </View>
  
              <Text style={styles.name}>
                Puneeth
              </Text>
  
              <Text style={styles.email}>
                puneeth@email.com
              </Text>
  
            </View>
  
            {/* ACCOUNT CARD */}
            <View style={styles.card}>
  
              <Text style={styles.cardTitle}>
                Account
              </Text>
  
              <TouchableOpacity
                style={styles.row}
                onPress={() => navigation.navigate('Bookings')}
              >
  
                <View style={styles.rowLeft}>
                  <Ionicons
                    name="calendar-outline"
                    size={20}
                    color="#7C3AED"
                  />
  
                  <Text style={styles.rowText}>
                    My Bookings
                  </Text>
                </View>
  
                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color="#999"
                />
  
              </TouchableOpacity>
  
              <View style={styles.divider} />
  
              <TouchableOpacity
                style={styles.row}
                onPress={() => navigation.navigate('Favorites')}
              >
  
                <View style={styles.rowLeft}>
                  <Ionicons
                    name="heart-outline"
                    size={20}
                    color="#7C3AED"
                  />
  
                  <Text style={styles.rowText}>
                    Favorites
                  </Text>
                </View>
  
                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color="#999"
                />
  
              </TouchableOpacity>
  
              <View style={styles.divider} />
  
              <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('EditProfile')}>
  
                <View style={styles.rowLeft}>
                  <Ionicons
                    name="person-outline"
                    size={20}
                    color="#7C3AED"
                  />
  
                  <Text style={styles.rowText} >
                    Edit Profile
                  </Text>
                </View>
  
                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color="#999"
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
                    color="#7C3AED"
                  />
  
                  <Text style={styles.rowText}>
                    Notifications
                  </Text>
                </View>
  
                <Switch
                  value={notifications}
                  onValueChange={setNotifications}
                  trackColor={{
                    false: '#ccc',
                    true: '#C4B5FD'
                  }}
                  thumbColor={
                    notifications
                      ? '#7C3AED'
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
  
              <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('HelpCenter')}>
  
                <View style={styles.rowLeft}>
                  <Ionicons
                    name="help-circle-outline"
                    size={20}
                    color="#7C3AED"
                  />
  
                  <Text style={styles.rowText}>
                    Help Center
                  </Text>
                </View>
  
                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color="#999"
                />
  
              </TouchableOpacity>
  
              <View style={styles.divider} />
  
              <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('Terms')}>
  
                <View style={styles.rowLeft}>
                  <Ionicons
                    name="document-text-outline"
                    size={20}
                    color="#7C3AED"
                  />
  
                  <Text style={styles.rowText}>
                    Terms & Privacy
                  </Text>
                </View>
  
                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color="#999"
                />
  
              </TouchableOpacity>
  
            </View>
  
            {/* LOGOUT */}
            <View style={styles.logoutWrapper}>

              <PrimaryButton
                title="Logout"
                bordered
                backgroundColor="#EF4444"
                textColor="#EF4444"
                onPress={() => {}}
              />

            </View>
  
          </ScrollView>
  
        </SafeAreaView>
  
      </MainLayout>
    );
  }
  
  const styles = StyleSheet.create({
  
    container: {
      flex: 1,
      backgroundColor: '#F3F0FF',
    },
  
    /* TOP SECTION */
    topSection: {
      alignItems: 'center',
      paddingTop: 30,
      paddingBottom: 25,
    },
  
    avatarWrapper: {
      position: 'relative',
    },
  
    avatar: {
      width: 95,
      height: 95,
      borderRadius: 50,
    },
  
    editAvatarBtn: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      backgroundColor: '#7C3AED',
      width: 30,
      height: 30,
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    name: {
      fontSize: 22,
      fontWeight: '800',
      marginTop: 12,
    },
  
    email: {
      fontSize: 13,
      color: '#666',
      marginTop: 4,
    },
  
    /* CARD */
    card: {
      backgroundColor: '#fff',
      marginHorizontal: 20,
      borderRadius: 18,
      paddingVertical: 10,
      marginBottom: 18,
    },
  
    cardTitle: {
      fontSize: 14,
      fontWeight: '700',
      color: '#7C3AED',
      marginBottom: 10,
      paddingHorizontal: 18,
      marginTop: 5,
    },
  
    /* ROW */
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
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
      color: '#222',
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