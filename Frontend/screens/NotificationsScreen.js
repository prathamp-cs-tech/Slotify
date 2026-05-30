// screens/NotificationsScreen.js

import {
  useState,
  useCallback,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import {
  Ionicons,
} from '@expo/vector-icons';

import {
  useFocusEffect,
} from '@react-navigation/native';

import MainLayout from '../components/MainLayout';

import API from '../services/api';

import {
  COLORS,
} from '../constants/colors';

export default function NotificationsScreen({
  navigation,
}) {

  const [notifications,
    setNotifications] =
      useState([]);

  const [loading,
    setLoading] =
      useState(true);

  useFocusEffect(

    useCallback(() => {

      fetchNotifications();

    }, [])

  );

  const fetchNotifications =
    async () => {

      try {

        setLoading(true);

        const response =
          await API.get(
            '/notifications'
          );

        setNotifications(
          response.data
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

  const markAsRead =
    async (id) => {

      try {

        await API.put(
          `/notifications/${id}/read`
        );

        setNotifications(prev =>

          prev.map(item =>

            item._id === id

              ? {
                  ...item,
                  isRead: true,
                }

              : item

          )

        );

      } catch (error) {

        console.log(error);

      }

    };

  const getIcon =
    (type) => {

      switch (type) {

        case 'booking_confirmed':

          return {
            name:
              'checkmark-done',
            color:
              '#7C3AED',
          };

        case 'booking_received_provider':

          return {
            name:
              'calendar',
            color:
              '#2563EB',
          };

        case 'booking_cancelled_user':

          return {
            name:
              'close-circle',
            color:
              '#DC2626',
          };

        case 'booking_cancelled_provider':

          return {
            name:
              'alert-circle',
            color:
              '#EA580C',
          };

        default:

          return {
            name:
              'notifications',
            color:
              COLORS.primary,
          };

      }

    };

  const formatTime =
    (date) => {

      const now =
        new Date();

      const created =
        new Date(date);

      const difference =
        Math.floor(
          (now - created) /
          1000
        );

      if (
        difference < 60
      ) {

        return 'Just now';

      }

      if (
        difference < 3600
      ) {

        return `${Math.floor(
          difference / 60
        )} min ago`;

      }

      if (
        difference < 86400
      ) {

        return `${Math.floor(
          difference / 3600
        )} hr ago`;

      }

      return `${Math.floor(
        difference / 86400
      )} day ago`;

    };

  const renderItem = ({
    item,
  }) => {

    const icon =
      getIcon(item.type);

    return (

      <TouchableOpacity

        activeOpacity={0.8}

        style={[

          styles.card,

          !item.isRead &&
          styles.unreadCard,

        ]}

        onPress={() =>
          markAsRead(item._id)
        }
      >

        <View
          style={[

            styles.iconBox,

            {
              backgroundColor:
                icon.color,
            },

          ]}
        >

          <Ionicons
            name={icon.name}
            size={24}
            color="#fff"
          />

        </View>

        <View style={styles.content}>

          <View style={styles.topRow}>

            <Text style={styles.title}>
              {item.title}
            </Text>

            <Text style={styles.time}>
              {formatTime(
                item.createdAt
              )}
            </Text>

          </View>

          <Text style={styles.message}>
            {item.message}
          </Text>

        </View>

      </TouchableOpacity>

    );

  };

  return (

    <MainLayout
      navigation={navigation}
    >

      <View style={styles.container}>

        <View style={styles.headerRow}>

          <Text style={styles.header}>
            Updates
          </Text>

          {notifications.some(
            item => !item.isRead
          ) && (

            <TouchableOpacity
              onPress={async () => {

                try {

                  await API.put(
                    '/notifications/read-all'
                  );

                  setNotifications(prev =>

                    prev.map(item => ({

                      ...item,

                      isRead: true,

                    }))

                  );

                } catch (error) {

                  console.log(error);

                }

              }}
            >

              <Text
                style={
                  styles.markAll
                }
              >
                Mark all read
              </Text>

            </TouchableOpacity>

          )}

        </View>

        {loading ? (

          <View style={styles.loader}>

            <ActivityIndicator
              size="large"
              color={COLORS.primary}
            />

          </View>

        ) : notifications.length === 0 ? (

          <View style={styles.empty}>

            <Ionicons
              name="notifications-outline"
              size={70}
              color="#C4B5FD"
            />

            <Text
              style={styles.emptyTitle}
            >
              No Updates Yet
            </Text>

            <Text
              style={styles.emptyText}
            >
              Your booking updates
              will appear here.
            </Text>

          </View>

        ) : (

          <FlatList

            data={notifications}

            keyExtractor={(item) =>
              item._id
            }

            renderItem={renderItem}

            showsVerticalScrollIndicator={
              false
            }

            contentContainerStyle={{
              paddingBottom: 120,
            }}

          />

        )}

      </View>

    </MainLayout>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor:
      '#F3F0FF',
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent:
      'space-between',
    alignItems: 'center',
    marginBottom: 22,
  },

  header: {
    fontSize: 28,
    fontWeight: '900',
    color: '#111',
  },

  markAll: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 13,
  },

  card: {
    backgroundColor: '#ECE7F8',
    borderRadius: 22,
    padding: 16,
    flexDirection: 'row',
    marginBottom: 14,
    alignItems: 'flex-start',
  },

  unreadCard: {
    borderWidth: 2,
    borderColor: '#C4B5FD',
  },

  iconBox: {
    width: 62,
    height: 62,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  content: {
    flex: 1,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent:
      'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  title: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111',
    flex: 1,
  },

  message: {
    fontSize: 13,
    color: '#666',
    lineHeight: 22,
    fontWeight: '500',
  },

  time: {
    fontSize: 12,
    color: '#666',
    marginLeft: 10,
  },

  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 120,
  },

  emptyTitle: {
    marginTop: 18,
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.text,
  },

  emptyText: {
    marginTop: 8,
    fontSize: 14,
    color: COLORS.gray,
    textAlign: 'center',
    lineHeight: 22,
  },

});