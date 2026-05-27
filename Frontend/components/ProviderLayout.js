import {
    StyleSheet,
    View,
  } from 'react-native';
  
  import {
    SafeAreaView,
  } from 'react-native-safe-area-context';
  
  import ProviderBottomNav from './ProviderNav';
  
  import { COLORS } from '../constants/colors';
  
  export default function ProviderLayout({
    children,
    navigation,
    active,
  }) {
  
    return (
  
      <SafeAreaView
        style={styles.container}
        edges={['top']}
      >
  
        <View style={styles.content}>
  
          {children}
  
        </View>
  
        <ProviderBottomNav
          navigation={navigation}
          active={active}
        />
  
      </SafeAreaView>
  
    );
  
  }
  
  const styles = StyleSheet.create({
  
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
    },
  
    content: {
      flex: 1,
    },
  
  });