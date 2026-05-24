import { View, StyleSheet } from 'react-native';
import BottomNav from './BottomNav';

export default function MainLayout({ children, navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {children}
      </View>

      <BottomNav navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    flex: 1,
  },
});