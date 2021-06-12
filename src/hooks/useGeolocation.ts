import { useCallback } from 'react';

const useGeolocation = () => {
  const getUserCoordinates = useCallback(async () => {
    let result: any = null;
    if (window.navigator.geolocation) {
      try {
        result = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
      } catch (e) {
        return result;
      }
    }

    return { latitude: result.coords.latitude, longitude: result.coords.longitude };
  }, []);

  return { getUserCoordinates };
};

export default useGeolocation;
