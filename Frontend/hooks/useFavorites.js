import { useState, useCallback } from 'react';

import { useFocusEffect } from '@react-navigation/native';

import API from '../services/api';

export default function useFavorites() {

  const [favorites, setFavorites] = useState({});

  const [loadingFavorites, setLoadingFavorites] = useState(true);

  const fetchFavorites = async () => {

    try {

      const response = await API.get('/favorites');

      const favMap = {};

      response.data.forEach(item => {

        favMap[item.salonId._id] = true;

      });

      setFavorites(favMap);

    } catch (error) {

      console.log(error);

    } finally {

      setLoadingFavorites(false);

    }

  };

  useFocusEffect(
    useCallback(() => {

      fetchFavorites();

    }, [])
  );

  const toggleFav = async (id) => {

    try {

      if (favorites[id]) {

        await API.delete(`/favorites/${id}`);

        setFavorites(prev => {

          const updated = {
            ...prev,
          };

          delete updated[id];

          return updated;

        });

      } else {

        await API.post('/favorites', {
          salonId: id,
        });

        setFavorites(prev => ({
          ...prev,
          [id]: true,
        }));

      }

    } catch (error) {

      console.log(error);

    }

  };

  return {
    favorites,
    toggleFav,
    loadingFavorites,
    fetchFavorites,
  };

}