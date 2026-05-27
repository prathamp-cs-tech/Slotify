import {
    useState,
  } from 'react';
  
  import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Switch,
    Alert,
    Image,
  } from 'react-native';
  
  import DateTimePicker
    from '@react-native-community/datetimepicker';
  
  import {
    SafeAreaView,
  } from 'react-native-safe-area-context';
  
  import {
    Ionicons,
  } from '@expo/vector-icons';
  
  import API from '../services/api';
  
  import PrimaryButton
    from '../components/PrimaryButton';
  
  import {
    COLORS,
  } from '../constants/colors';
  
  export default function EditServiceScreen({
  
    route,
    navigation,
  
  }) {
  
    const {
      salon,
      service,
    } = route.params;
  
    const [name, setName] =
      useState(service.name);
  
    const [category] =
      useState(service.category);
  
    const [price, setPrice] =
      useState(
        String(service.price)
      );
  
    const [duration, setDuration] =
      useState(
        String(service.duration)
      );
  
    const [available, setAvailable] =
      useState(service.isActive);
  
    const [selectedDate,
      setSelectedDate] =
        useState(new Date());
  
    const [showPicker,
      setShowPicker] =
        useState(false);
  
    const [blockedSlots,
      setBlockedSlots] =
        useState(
          service.blockedSlots || []
        );
  
    const TIMES = [
  
      '10:00 am',
      '10:30 am',
      '11:00 am',
      '11:30 am',
      '12:00 pm',
      '12:30 pm',
      '1:00 pm',
      '1:30 pm',
      '4:00 pm',
      '4:30 pm',
      '5:00 pm',
      '5:30 pm',
  
    ];
  
    const dateKey =
      selectedDate
        .toISOString()
        .split('T')[0];
  
    const currentDateSlots =
      blockedSlots.find(
        item =>
          item.date === dateKey
      );
  
    const selectedSlots =
      currentDateSlots
        ? currentDateSlots.slots
        : [];
  
    const onChangeDate = (
      event,
      selected
    ) => {
  
      if (selected) {
  
        setSelectedDate(selected);
  
      }
  
    };
  
    const toggleSlot = (slot) => {
  
      let updated =
        [...blockedSlots];
  
      const index =
        updated.findIndex(
          item =>
            item.date === dateKey
        );
  
      if (index === -1) {
  
        updated.push({
  
          date: dateKey,
  
          slots: [slot],
  
        });
  
      } else {
  
        const exists =
          updated[index]
            .slots
            .includes(slot);
  
        if (exists) {
  
          updated[index]
            .slots =
            updated[index]
              .slots
              .filter(
                s => s !== slot
              );
  
        } else {
  
          updated[index]
            .slots
            .push(slot);
  
        }
  
      }
  
      setBlockedSlots(updated);
  
    };
  
    const saveChanges =
      async () => {
  
        try {
  
          const response =
            await API.put(
  
              `/provider/services/${service._id}`,
  
              {
  
                name,
  
                category,
  
                price:
                  Number(price),
  
                duration:
                  Number(duration),
  
                isActive:
                  available,
  
                blockedSlots,
  
              }
  
            );
  
          console.log(
            response.data
          );
  
          Alert.alert(
            'Success',
            'Service updated successfully'
          );
  
          navigation.goBack();
  
        } catch (error) {
  
          console.log(
            error.response?.data
          );
  
          Alert.alert(
            'Error',
            'Update failed'
          );
  
        }
  
      };
  
    return (
  
      <SafeAreaView
        style={styles.safe}
      >
  
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
  
          <View>
  
            <Image
              source={{
                uri:
                  service.image ||
                  salon.image,
              }}
              style={styles.image}
            />
  
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() =>
                navigation.goBack()
              }
            >
  
              <Ionicons
                name="arrow-back"
                size={20}
              />
  
            </TouchableOpacity>
  
          </View>
  
          <View style={styles.container}>
  
            <View style={styles.topRow}>
  
              <Text style={styles.title}>
                Edit Service
              </Text>
  
              <Switch
                value={available}
                onValueChange={
                  setAvailable
                }
              />
  
            </View>
  
            <Text style={styles.label}>
              Service Name
            </Text>
  
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
            />
  
            <Text style={styles.label}>
              Category
            </Text>
  
            <TextInput
              style={styles.input}
              value={category}
              editable={false}
            />
  
            <Text style={styles.label}>
              Price
            </Text>
  
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={price}
              onChangeText={setPrice}
            />
  
            <Text style={styles.label}>
              Duration
            </Text>
  
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={duration}
              onChangeText={setDuration}
            />
  
            <Text style={styles.label}>
              Date
            </Text>
  
            <TouchableOpacity
              style={styles.dateBox}
              onPress={() =>
                setShowPicker(true)
              }
            >
  
              <Text
                style={
                  styles.dateText
                }
              >
                {selectedDate.toDateString()}
              </Text>
  
            </TouchableOpacity>
  
            {showPicker && (
  
              <View
                style={
                  styles.pickerWrapper
                }
              >
  
                <DateTimePicker
                  value={selectedDate}
                  mode="date"
                  display="spinner"
                  minimumDate={
                    new Date()
                  }
                  onChange={
                    onChangeDate
                  }
                />
  
                <TouchableOpacity
                  style={styles.doneBtn}
                  onPress={() =>
                    setShowPicker(false)
                  }
                >
  
                  <Text
                    style={
                      styles.doneText
                    }
                  >
                    Done
                  </Text>
  
                </TouchableOpacity>
  
              </View>
  
            )}
  
            <Text style={styles.label}>
              Block Slots
            </Text>
  
            <View style={styles.timeGrid}>
  
              {TIMES.map((slot) => {
  
                const active =
                  selectedSlots.includes(
                    slot
                  );
  
                return (
  
                  <TouchableOpacity
  
                    key={slot}
  
                    style={[
  
                      styles.timeBtn,
  
                      active &&
                        styles.activeTime,
  
                    ]}
  
                    onPress={() =>
                      toggleSlot(slot)
                    }
                  >
  
                    <Text
                      style={[
  
                        styles.timeText,
  
                        active &&
                          styles.activeTimeText,
  
                      ]}
                    >
                      {slot}
                    </Text>
  
                  </TouchableOpacity>
  
                );
  
              })}
  
            </View>
  
            <PrimaryButton
              title="Save Changes"
              onPress={
                saveChanges
              }
            />
  
            <View
              style={{
                height: 40,
              }}
            />
  
          </View>
  
        </ScrollView>
  
      </SafeAreaView>
  
    );
  
  }
  
  const styles = StyleSheet.create({
  
    safe: {
      flex: 1,
      backgroundColor:
        COLORS.background,
    },
  
    image: {
      width: '100%',
      height: 240,
    },
  
    backBtn: {
      position: 'absolute',
      top: 50,
      left: 20,
      backgroundColor:
        COLORS.white,
      padding: 8,
      borderRadius: 20,
    },
  
    container: {
      padding: 20,
    },
  
    topRow: {
      flexDirection: 'row',
      justifyContent:
        'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
  
    title: {
      fontSize: 24,
      fontWeight: '800',
      color: COLORS.text,
    },
  
    label: {
      fontSize: 15,
      fontWeight: '700',
      marginBottom: 10,
      marginTop: 18,
      color: COLORS.text,
    },
  
    input: {
      backgroundColor:
        COLORS.card,
      padding: 16,
      borderRadius: 14,
      fontSize: 15,
      color: COLORS.text,
    },
  
    dateBox: {
      backgroundColor:
        COLORS.card,
      padding: 14,
      borderRadius: 10,
      alignItems: 'center',
      marginBottom: 20,
    },
  
    dateText: {
      fontWeight: '600',
    },
  
    pickerWrapper: {
      alignItems: 'center',
      backgroundColor:
        COLORS.white,
      borderRadius: 20,
      paddingVertical: 10,
      marginBottom: 20,
    },
  
    doneBtn: {
      marginTop: 10,
      backgroundColor:
        COLORS.primary,
      paddingHorizontal: 28,
      paddingVertical: 10,
      borderRadius: 20,
    },
  
    doneText: {
      color: COLORS.white,
      fontWeight: '700',
      fontSize: 14,
    },
  
    timeGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent:
        'space-between',
      marginBottom: 20,
    },
  
    timeBtn: {
      width: '47%',
      paddingVertical: 14,
      borderRadius: 18,
      backgroundColor:
        '#EDE9FE',
      marginBottom: 12,
      alignItems: 'center',
    },
  
    activeTime: {
      backgroundColor:
        COLORS.primary,
    },
  
    activeTimeText: {
      color: COLORS.white,
      fontWeight: '700',
    },
  
    timeText: {
      fontWeight: '600',
      color: COLORS.text,
    },
  
  });