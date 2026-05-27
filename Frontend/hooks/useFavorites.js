import {
    useEffect,
    useState,
  } from 'react';
  
  import AsyncStorage from '@react-native-async-storage/async-storage';
  
  import API from '../services/api';
  
  export default function useFavorites() {
  
    const [favorites,
      setFavorites] =
        useState([]);
  
    useEffect(() => {
  
      loadFavorites();
  
    }, []);
  
    const loadFavorites =
      async () => {
  
        try {
  
          const response =
            await API.get(
              '/favorites'
            );
  
          const ids =
            response.data
  
              .map(item =>
  
                item.serviceId?._id
  
              )
  
              .filter(Boolean);
  
          setFavorites(ids);
  
          await AsyncStorage.setItem(
  
            'favorites',
  
            JSON.stringify(ids)
  
          );
  
        } catch (error) {
  
          console.log(error);
  
        }
  
      };
  
    const toggleFav =
      async (salon) => {
  
        try {
  
          const serviceId =
            salon.serviceData._id;
  
          let updated = [];
  
          if (
            favorites.includes(
              serviceId
            )
          ) {
  
            const response =
              await API.get(
                '/favorites'
              );
  
            const favorite =
              response.data.find(
  
                item =>
  
                  item.serviceId?._id ===
                  serviceId
  
              );
  
            if (favorite) {
  
              await API.delete(
  
                `/favorites/${favorite._id}`
  
              );
  
            }
  
            updated =
              favorites.filter(
  
                item =>
                  item !== serviceId
  
              );
  
          } else {
  
            await API.post(
              '/favorites',
              {
  
                salonId:
                  salon._id,
  
                serviceId,
  
              }
            );
  
            updated = [
  
              ...favorites,
  
              serviceId,
  
            ];
  
          }
  
          setFavorites(updated);
  
          await AsyncStorage.setItem(
  
            'favorites',
  
            JSON.stringify(updated)
  
          );
  
        } catch (error) {
  
          console.log(error);
  
        }
  
      };
  
    return {
  
      favorites,
  
      toggleFav,
  
    };
  
  }