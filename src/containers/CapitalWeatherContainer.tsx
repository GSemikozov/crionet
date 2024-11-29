import { useEffect } from 'react';
import WeatherInfoCard from '@/components/WeatherInfoCard';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchWeatherByCapital,
  selectWeatherData,
  selectWeatherLoading,
  selectWeatherError,
  clearWeather
} from '@/store/slices/weatherSlice';
import { Country } from '@/types';

interface CapitalWeatherContainerProps {
  capital: Country['capital'];
}

export default function CapitalWeatherContainer({ capital }: CapitalWeatherContainerProps) {
  const dispatch = useAppDispatch();
  const weatherData = useAppSelector(selectWeatherData);
  const isLoading = useAppSelector(selectWeatherLoading);
  const error = useAppSelector(selectWeatherError);

  useEffect(() => {
    if (!capital) {
      dispatch(clearWeather());
      return;
    }

    dispatch(fetchWeatherByCapital(capital));
  }, [capital, dispatch]);

  if (!capital) return null;

  return (
    <WeatherInfoCard
      capital={capital}
      isLoading={isLoading}
      weatherData={weatherData}
      error={error}
    />
  );
}
