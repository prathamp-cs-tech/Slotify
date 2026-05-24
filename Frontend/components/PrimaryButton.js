import {
    TouchableOpacity,
    Text,
    StyleSheet,
  } from 'react-native';
  
  export default function PrimaryButton({
    title,
    onPress,
    backgroundColor = '#7C3AED',
    textColor = '#fff',
    bordered = false,
  }) {
  
    return (
  
      <TouchableOpacity
        style={[
          styles.button,
  
          bordered && {
            backgroundColor: '#fff',
            borderWidth: 1,
            borderColor: backgroundColor,
          },
  
          {
            backgroundColor: bordered
              ? '#fff'
              : backgroundColor,
          },
        ]}
        onPress={onPress}
      >
  
        <Text
          style={[
            styles.text,
            {
              color: bordered
                ? backgroundColor
                : textColor,
            },
          ]}
        >
          {title}
        </Text>
  
      </TouchableOpacity>
  
    );
  }
  
  const styles = StyleSheet.create({
  
    button: {
      height: 52,
      borderRadius: 26,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
    },
  
    text: {
      fontSize: 14,
      fontWeight: '700',
    },
  
  });