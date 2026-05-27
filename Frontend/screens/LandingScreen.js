import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { COLORS } from '../constants/colors';

export default function LandingScreen({ navigation }) {

  return (

    <View style={styles.container}>

      <View style={styles.top}>

        <Text style={styles.title}>
          SLOTIFY
        </Text>

      </View>

      <View style={styles.middle}>

        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?w=900&auto=format&fit=crop&q=60',
          }}
          style={styles.mainImage}
        />

        <View style={styles.row}>

          <Image
            source={{
              uri: 'https://plus.unsplash.com/premium_photo-1661507250205-79ffef5cdeb5?w=900&auto=format&fit=crop&q=60',
            }}
            style={styles.smallImage}
          />

          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1629397685944-7073f5589754?w=900&auto=format&fit=crop&q=60',
            }}
            style={styles.smallImage}
          />

        </View>

      </View>

      <View style={styles.bottom}>

        <Text style={styles.heading}>
          Your time. Your schedule.
        </Text>

        <Text style={styles.subText}>
          Book smarter, live better.
        </Text>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Login', {
              role: 'customer',
            })
          }
        >

          <LinearGradient
            colors={[
              '#7B6CFF',
              '#5A4DFF',
            ]}
            style={styles.button}
          >

            <Text style={styles.buttonText}>
              LOGIN / SIGN UP
            </Text>

          </LinearGradient>

        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Login', {
              role: 'provider',
            })
          }
        >

          <Text style={styles.footer}>

            Are you a service provider?{' '}

            <Text style={styles.link}>
              Login/Signup here
            </Text>

          </Text>

        </TouchableOpacity>

      </View>

    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  top: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  middle: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 60,
  },

  bottom: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 5,
    color: COLORS.primary,
  },

  mainImage: {
    width: '85%',
    height: 190,
    borderRadius: 20,
    marginBottom: 15,
  },

  row: {
    flexDirection: 'row',
    gap: 10,
  },

  smallImage: {
    width: 150,
    height: 100,
    borderRadius: 15,
  },

  heading: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 6,
  },

  subText: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 24,
  },

  button: {
    width: 260,
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 14,
  },

  buttonText: {
    color: COLORS.white,
    fontWeight: '700',
    letterSpacing: 1,
  },

  footer: {
    fontSize: 12,
    color: COLORS.gray,
  },

  link: {
    color: COLORS.primary,
    fontWeight: '700',
  },

});