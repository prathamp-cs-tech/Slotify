import { StyleSheet, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import BottomNav from './BottomNav';

export default function MainLayout({
  children,
  navigation,
}) {

  return (

    <SafeAreaView
      style={styles.container}
      edges={['top']}
    >

      <View style={styles.content}>

        {children}

      </View>

      <BottomNav navigation={navigation} />

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