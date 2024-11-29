import { Country } from "@/types";

interface WeatherResponse {
  current: {
    temperature_2m: number;
    weather_code: number;
  };
}

interface GeocodingResponse {
  results?: Array<{
    latitude: number;
    longitude: number;
  }>;
}

// Weather codes mapping based on Open-Meteo documentation
const weatherCodeToDescription: Record<number, string> = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Foggy',
  48: 'Depositing rime fog',
  51: 'Light drizzle',
  53: 'Moderate drizzle',
  55: 'Dense drizzle',
  61: 'Slight rain',
  63: 'Moderate rain',
  65: 'Heavy rain',
  71: 'Slight snow fall',
  73: 'Moderate snow fall',
  75: 'Heavy snow fall',
  77: 'Snow grains',
  80: 'Slight rain showers',
  81: 'Moderate rain showers',
  82: 'Violent rain showers',
  85: 'Slight snow showers',
  86: 'Heavy snow showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm with slight hail',
  99: 'Thunderstorm with heavy hail',
};

// Get weather icon based on weather code and current hour
function getWeatherIcon(code: number): string {
  // Map weather codes to icon codes
  const iconMap: Record<number, string> = {
    0: '01d', // Clear sky
    1: '02d', // Mainly clear
    2: '03d', // Partly cloudy
    3: '04d', // Overcast
    45: '50d', // Foggy
    48: '50d', // Rime fog
    51: '09d', // Light drizzle
    53: '09d', // Moderate drizzle
    55: '09d', // Dense drizzle
    61: '10d', // Slight rain
    63: '10d', // Moderate rain
    65: '10d', // Heavy rain
    71: '13d', // Slight snow
    73: '13d', // Moderate snow
    75: '13d', // Heavy snow
    77: '13d', // Snow grains
    80: '09d', // Rain showers
    81: '09d', // Moderate rain showers
    82: '09d', // Violent rain showers
    85: '13d', // Snow showers
    86: '13d', // Heavy snow showers
    95: '11d', // Thunderstorm
    96: '11d', // Thunderstorm with hail
    99: '11d', // Thunderstorm with heavy hail
  };

  return iconMap[code] || '03d'; // Default to partly cloudy if code not found
}

export async function getCapitalWeather(capital: Country['capital']) {
  // First, get coordinates for the capital city
  const geocodingResponse = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(capital)}&count=1&language=en&format=json`
  );
  const geocodingData: GeocodingResponse = await geocodingResponse.json();

  if (!geocodingData.results?.[0]) {
    throw new Error(`Could not find coordinates for ${capital}`);
  }

  const { latitude, longitude } = geocodingData.results[0];

  // Then, get weather data for these coordinates
  const weatherResponse = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`
  );
  const weatherData: WeatherResponse = await weatherResponse.json();

  const weatherCode = weatherData.current.weather_code;

  return {
    temperature: Math.round(weatherData.current.temperature_2m),
    description: weatherCodeToDescription[weatherCode] || 'Unknown',
    icon: getWeatherIcon(weatherCode),
  };
}
