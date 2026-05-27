import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveUserData = async (
  token,
  user
) => {

  try {

    await AsyncStorage.setItem(
      'token',
      token
    );

    await AsyncStorage.setItem(
      'user',
      JSON.stringify(user)
    );

  } catch (error) {

    console.log(error);

  }

};

export const getUserData = async () => {

  try {

    const user =
      await AsyncStorage.getItem(
        'user'
      );

    return user
      ? JSON.parse(user)
      : null;

  } catch (error) {

    console.log(error);

    return null;

  }

};

export const getToken = async () => {

  try {

    return await AsyncStorage.getItem(
      'token'
    );

  } catch (error) {

    console.log(error);

    return null;

  }

};

export const logoutUser = async () => {

  try {

    await AsyncStorage.removeItem(
      'token'
    );

    await AsyncStorage.removeItem(
      'user'
    );

  } catch (error) {

    console.log(error);

  }

};