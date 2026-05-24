import { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Ionicons } from '@expo/vector-icons';

export default function EditServiceScreen({
  route,
  navigation,
}) {

  const { salon } = route.params;

  const [name, setName] = useState(salon.name);

  const [price, setPrice] = useState(
    salon.price.toString()
 );

  return (

    <SafeAreaView style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >

          <Ionicons
            name="arrow-back"
            size={24}
            color="#333"
          />

        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Edit
        </Text>

      </View>

      {/* NAME */}
      <Text style={styles.label}>
        Service Name
      </Text>

      <View style={styles.inputBox}>

        <Ionicons
          name="cut-outline"
          size={18}
          color="#777"
        />

        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

      </View>

      {/* PRICE */}
      <Text style={styles.label}>
        Price
      </Text>

      <View style={styles.inputBox}>

        <Ionicons
          name="cash-outline"
          size={18}
          color="#777"
        />

        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />

      </View>

      {/* SAVE */}
      <TouchableOpacity
        style={styles.saveBtn}
        onPress={() => navigation.goBack()}
      >

        <Text style={styles.saveBtnText}>
          SAVE CHANGES
        </Text>

      </TouchableOpacity>

    </SafeAreaView>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F7F5FF',
    padding: 20,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginLeft: 14,
    color: '#6D28D9',
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
    color: '#444',
  },

  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDEBFF',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 20,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: '#333',
  },

  saveBtn: {
    backgroundColor: '#7C3AED',
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 10,
  },

  saveBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
    letterSpacing: 1,
  },

});