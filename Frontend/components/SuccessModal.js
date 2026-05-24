import {
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
  } from 'react-native';
  
  import {
    Ionicons,
  } from '@expo/vector-icons';
  
  import {
    useEffect,
    useRef,
  } from 'react';
  
  export default function SuccessModal({
    visible,
    title,
    onClose,
  }) {
  
    const scaleAnim = useRef(
      new Animated.Value(0.7)
    ).current;
  
    const opacityAnim = useRef(
      new Animated.Value(0)
    ).current;
  
    useEffect(() => {
  
      if (visible) {
  
        Animated.parallel([
  
          Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 6,
            useNativeDriver: true,
          }),
  
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 250,
            useNativeDriver: true,
          }),
  
        ]).start();
  
      } else {
  
        scaleAnim.setValue(0.7);
        opacityAnim.setValue(0);
  
      }
  
    }, [visible]);
  
    return (
  
      <Modal
        transparent
        visible={visible}
      >
  
        <View style={styles.overlay}>
  
          <Animated.View
            style={[
              styles.box,
              {
                transform: [
                  { scale: scaleAnim }
                ],
                opacity: opacityAnim,
              },
            ]}
          >
  
            <Ionicons
              name="checkmark-circle"
              size={72}
              color="#7C3AED"
            />
  
            <Text style={styles.title}>
              {title}
            </Text>
  
            <TouchableOpacity
              style={styles.okBtn}
              onPress={onClose}
            >
  
              <Text style={styles.okText}>
                OK
              </Text>
  
            </TouchableOpacity>
  
          </Animated.View>
  
        </View>
  
      </Modal>
  
    );
  }
  
  const styles = StyleSheet.create({
  
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.35)',
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    box: {
      width: '72%',
      backgroundColor: '#fff',
      borderRadius: 26,
      paddingVertical: 30,
      paddingHorizontal: 24,
      alignItems: 'center',
    },
  
    title: {
      marginTop: 14,
      fontSize: 17,
      fontWeight: '700',
      color: '#111',
    },
  
    okBtn: {
      marginTop: 18,
    },
  
    okText: {
      color: '#7C3AED',
      fontSize: 15,
      fontWeight: '700',
    },
  
  });