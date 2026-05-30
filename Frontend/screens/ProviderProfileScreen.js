import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Switch,
  } from 'react-native';
  
  import {
    Ionicons,
  } from '@expo/vector-icons';
  
  import {
    useState,
    useEffect,
  } from 'react';
  
  import MainLayout
    from '../components/MainLayout';
  
  import PrimaryButton
    from '../components/PrimaryButton';
  
  import {
    COLORS,
  } from '../constants/colors';
  
  import {
    getUserData,
    logoutUser,
  } from '../services/auth';
  
  import API from '../services/api';
import ProviderLayout from '../components/ProviderLayout';
  
  export default function
  ProviderProfileScreen({
  
    navigation,
  
  }) {
  
    const [user,
      setUser] =
        useState(null);
  
    const [salon,
      setSalon] =
        useState(null);
  
    useEffect(() => {
  
      loadData();
  
    }, []);
  
    const loadData =
      async () => {
  
        try {
  
          const userData =
            await getUserData();
  
          setUser(userData);
  
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
  
    const handleLogout =
      async () => {
  
        await logoutUser();
  
        navigation.replace(
          'Landing'
        );
  
      };
  
    return (
  
      <ProviderLayout
        navigation={navigation}
      >
  
        <View style={styles.container}>
  
          <ScrollView
            showsVerticalScrollIndicator={
              false
            }
            contentContainerStyle={{
              paddingBottom: 30,
            }}
          >
  
            {/* TOP SECTION */}
            <View style={styles.topSection}>
  
              <View
                style={
                  styles.avatarWrapper
                }
              >
  
                <Text
                  style={
                    styles.avatarText
                  }
                >
                  {salon?.name
                    ?.charAt(0)
                    ?.toUpperCase() || 'S'}
                </Text>
  
              </View>
  
              <Text style={styles.name}>
  
                {salon?.name ||
                  'Salon'}
  
              </Text>
  
              <Text style={styles.email}>
  
                {user?.email ||
                  'No Email'}
  
              </Text>
  
              <Text style={styles.location}>
  
                {salon?.address ||
                  'No Location'}
  
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
                    'ProviderBookings'
                  )
                }
              >
  
                <View
                  style={
                    styles.rowLeft
                  }
                >
  
                  <Ionicons
                    name="calendar-outline"
                    size={20}
                    color={
                      COLORS.primary
                    }
                  />
  
                  <Text
                    style={
                      styles.rowText
                    }
                  >
                    Appointments
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
  
              <View
                style={styles.divider}
              />
  
              <TouchableOpacity
                style={styles.row}
                onPress={() =>
                  navigation.navigate(
                    'ManageServices'
                  )
                }
              >
  
                <View
                  style={
                    styles.rowLeft
                  }
                >
  
                  <Ionicons
                    name="cut-outline"
                    size={20}
                    color={
                      COLORS.primary
                    }
                  />
  
                  <Text
                    style={
                      styles.rowText
                    }
                  >
                    Manage Services
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
  
              <View
                style={styles.divider}
              />
  
              <TouchableOpacity
                style={styles.row}
                onPress={() =>
                  navigation.navigate(
                    'EditSalonDetails'
                  )
                }
              >
  
                <View
                  style={
                    styles.rowLeft
                  }
                >
  
                  <Ionicons
                    name="business-outline"
                    size={20}
                    color={
                      COLORS.primary
                    }
                  />
  
                  <Text
                    style={
                      styles.rowText
                    }
                  >
                    Edit Salon Details
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
                      'ProviderNotifications'
                    )
                  }
                >

                  <View style={styles.rowLeft}>

                    <Ionicons
                      name="notifications-outline"
                      size={20}
                      color={COLORS.primary}
                    />

                    <Text style={styles.rowText}>
                      Updates
                    </Text>

                  </View>

                  <Ionicons
                    name="chevron-forward"
                    size={18}
                    color={COLORS.lightGray}
                  />

                </TouchableOpacity>
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
  
                <View
                  style={
                    styles.rowLeft
                  }
                >
  
                  <Ionicons
                    name="help-circle-outline"
                    size={20}
                    color={
                      COLORS.primary
                    }
                  />
  
                  <Text
                    style={
                      styles.rowText
                    }
                  >
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
  
              <View
                style={styles.divider}
              />
  
              <TouchableOpacity
                style={styles.row}
                onPress={() =>
                  navigation.navigate(
                    'Terms'
                  )
                }
              >
  
                <View
                  style={
                    styles.rowLeft
                  }
                >
  
                  <Ionicons
                    name="document-text-outline"
                    size={20}
                    color={
                      COLORS.primary
                    }
                  />
  
                  <Text
                    style={
                      styles.rowText
                    }
                  >
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
            <View
              style={
                styles.logoutWrapper
              }
            >
  
              <PrimaryButton
                title="Logout"
                bordered
                backgroundColor={
                  COLORS.danger
                }
                textColor={
                  COLORS.danger
                }
                onPress={
                  handleLogout
                }
              />
  
            </View>
  
          </ScrollView>
  
        </View>
  
      </ProviderLayout>
  
    );
  
  }
  
  const styles =
    StyleSheet.create({
  
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
        width: 95,
        height: 95,
        borderRadius: 50,
        backgroundColor:
          COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
      },
  
      avatarText: {
        color: COLORS.white,
        fontSize: 38,
        fontWeight: '900',
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
  
      location: {
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
        backgroundColor:
          '#EFEFEF',
        marginHorizontal: 18,
      },
  
      logoutWrapper: {
        marginHorizontal: 20,
        marginTop: 10,
      },
  
    });