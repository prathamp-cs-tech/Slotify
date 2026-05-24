import {
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

export default function ProviderBottomNav({
  navigation,
}) {

  return (

    <View style={styles.container}>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate(
            'ProviderHome'
          )
        }
      >

        <Ionicons
          name="home"
          size={24}
          color="#7C3AED"
        />

      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate(
            'Appointments'
          )
        }
      >

        <Ionicons
          name="calendar"
          size={24}
          color="#777"
        />

      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate(
            'ProviderProfile'
          )
        }
      >

        <Ionicons
          name="person"
          size={24}
          color="#777"
        />

      </TouchableOpacity>

    </View>

  );
}

const styles = StyleSheet.create({

  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },

});