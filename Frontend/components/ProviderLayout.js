import { StyleSheet, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import ProviderBottomNav from './ProviderNav';

export default function ProviderLayout({
  children,
  navigation,
}) {

  return (

    <SafeAreaView style={styles.container}>

      <View style={styles.content}>

        {children}

      </View>

      <ProviderBottomNav
        navigation={navigation}
      />

    </SafeAreaView>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F7F5FF',
  },

  content: {
    flex: 1,
  },

});