import {
    View,
    Text,
    Modal,
    StyleSheet,
    TouchableOpacity,
  } from 'react-native';
  
import { Ionicons } from '@expo/vector-icons';
  
import PrimaryButton from './PrimaryButton';

export default function FilterModal({
    visible,
    onClose,
    title = 'Filters',
    options = [],
    checkedOption,
  }) {
  
    return (
  
      <Modal
        transparent
        visible={visible}
        animationType="fade"
      >
  
        <View style={styles.modalOverlay}>
  
          <View style={styles.filterModal}>
  
            <Text style={styles.filterTitle}>
              {title}
            </Text>
  
            {options.map((item, index) => (
  
              <TouchableOpacity
                key={index}
                style={styles.filterOption}
              >
  
                <Ionicons
                  name={
                    checkedOption === item
                      ? 'checkbox'
                      : 'square-outline'
                  }
                  size={22}
                  color="#7C3AED"
                />
  
                <Text style={styles.optionText}>
                  {item}
                </Text>
  
              </TouchableOpacity>
  
            ))}
            <PrimaryButton
                title="Apply Filters"
                onPress={onClose}
            />
          </View>
        </View>
      </Modal>
  
    );
  }
  
  const styles = StyleSheet.create({
  
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.35)',
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    filterModal: {
      width: '82%',
      backgroundColor: '#fff',
      borderRadius: 24,
      padding: 22,
    },
  
    filterTitle: {
      fontSize: 18,
      fontWeight: '800',
      marginBottom: 20,
      color: '#111',
    },
  
    filterOption: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 18,
    },
  
    optionText: {
      marginLeft: 12,
      fontSize: 14,
      fontWeight: '600',
      color: '#444',
    },
  
  });