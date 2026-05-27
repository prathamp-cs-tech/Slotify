// components/RatingModal.js

import {
  useState,
} from 'react';

import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

import {
  Ionicons,
} from '@expo/vector-icons';

import PrimaryButton from './PrimaryButton';

import {
  COLORS,
} from '../constants/colors';

export default function RatingModal({

  visible,
  onClose,
  onSubmit,
  serviceName,

}) {

  const [rating,
    setRating] =
      useState(0);

  const [review,
    setReview] =
      useState('');

  const handleSubmit =
    () => {

      if (rating === 0) {
        return;
      }

      onSubmit(
        rating,
        review
      );

      setRating(0);

      setReview('');

    };

  return (

    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

      <View style={styles.overlay}>

        <View style={styles.modal}>

          <Text style={styles.title}>
            Rate Service
          </Text>

          <Text style={styles.service}>
            {serviceName}
          </Text>

          <View style={styles.starsRow}>

            {[1, 2, 3, 4, 5]
              .map((star) => (

              <TouchableOpacity
                key={star}
                onPress={() =>
                  setRating(star)
                }
              >

                <Ionicons

                  name={

                    star <= rating

                      ? 'star'

                      : 'star-outline'

                  }

                  size={34}

                  color="#F59E0B"

                />

              </TouchableOpacity>

            ))}

          </View>

          <TextInput
            placeholder="Write a review (optional)"
            placeholderTextColor="#999"
            value={review}
            onChangeText={setReview}
            multiline
            style={styles.input}
          />

          <PrimaryButton
            title="Submit Rating"
            onPress={handleSubmit}
          />

          <TouchableOpacity
            onPress={onClose}
          >

            <Text style={styles.cancel}>
              Cancel
            </Text>

          </TouchableOpacity>

        </View>

      </View>
      </TouchableWithoutFeedback>

    </Modal>

  );

}

const styles = StyleSheet.create({

  overlay: {
    flex: 1,
    backgroundColor:
      'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  modal: {
    width: '100%',
    backgroundColor:
      COLORS.white,
    borderRadius: 26,
    padding: 24,
  },

  title: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.text,
    textAlign: 'center',
  },

  service: {
    marginTop: 8,
    textAlign: 'center',
    color: COLORS.gray,
    fontWeight: '600',
  },

  starsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 24,
    gap: 8,
  },

  input: {
    backgroundColor:
      COLORS.card,
    borderRadius: 18,
    padding: 16,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 20,
    color: COLORS.text,
  },

  cancel: {
    textAlign: 'center',
    marginTop: 14,
    color: COLORS.gray,
    fontWeight: '700',
  },

});