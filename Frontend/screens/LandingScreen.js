import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function LandingScreen({ navigation }) {
  return (
    <View style={styles.container}>
  
      {/* TOP */}
      <View style={styles.top}>
        <Text style={styles.title}>SLOTIFY</Text>
      </View>
  
      {/* MIDDLE (images) */}
      <View style={styles.middle}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2Fsb258ZW58MHx8MHx8fDA%3D' }}
          style={styles.mainImage}
        />
  
        <View style={styles.row}>
          <Image
            source={{ uri: 'https://plus.unsplash.com/premium_photo-1661507250205-79ffef5cdeb5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2Fsb24lMjBtZW58ZW58MHx8MHx8fDA%3D' }}
            style={styles.smallImage}
          />
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1629397685944-7073f5589754?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNhbG9ufGVufDB8fDB8fHww' }}
            style={styles.smallImage}
          />
        </View>
      </View>
  
      {/* BOTTOM */}
      <View style={styles.bottom}>
        <Text style={styles.heading}>Your time. Your schedule.</Text>
        <Text style={styles.subText}>Book smarter, live better.</Text>
  
        <TouchableOpacity onPress={() => navigation.navigate('Login', {role: 'customer'})}>
          <LinearGradient colors={['#7B6CFF', '#5A4DFF']} style={styles.button}>
            <Text style={styles.buttonText}>LOGIN / SIGN UP</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login', {role: 'provider'})}>
          <Text style={styles.footer}>
            Are you a service provider? <Text style={styles.link}>Sign up here</Text>
          </Text>
        </TouchableOpacity>
      </View>
  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDECF5',
  },

  top: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  middle: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent:'flex-start',
    paddingTop:'60'
  },

  bottom: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: 4,
  },

  mainImage: {
    width: '85%',
    height: 180,
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
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 5,
  },

  subText: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 20,
  },

  button: {
    width: 260,
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 10,
  },

  buttonText: {
    color: 'white',
    fontWeight: '600',
  },

  footer: {
    fontSize: 12,
    color: 'gray',
  },

  link: {
    color: '#6C63FF',
    fontWeight: '600',
  },
});