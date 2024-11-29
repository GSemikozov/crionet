import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Country } from '@/types';
import ErrorMessage from './ErrorMessage';

interface WeatherData {
  temperature: number;
  description: string;
  icon: string;
}

interface WeatherInfoCardProps {
  capital: Country['capital'];
  isLoading: boolean;
  weatherData: WeatherData | null;
  error: string | null;
}

const WeatherInfoCardSkeleton = () => {
  return (<div className="flex items-center">
    <Skeleton className="h-[50px] w-[50px] rounded-full" />
    <div className="ml-4">
      <Skeleton className="h-6 w-20 mb-2" />
      <Skeleton className="h-4 w-32" />
    </div>
  </div>)
}

export default function WeatherInfoCard({
  capital,
  isLoading,
  weatherData,
  error
}: WeatherInfoCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather in {capital}</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <WeatherInfoCardSkeleton />
        ) : error ? (
          <ErrorMessage title="Weather error" message={error} />
        ) : weatherData ? (
          <div className="flex items-center">
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
              alt={weatherData.description}
              className="h-[50px] w-[50px]"
            />
            <div className="ml-4">
              <p className="text-2xl font-semibold mb-1">
                {weatherData.temperature}°C
              </p>
              <p className="text-muted-foreground capitalize">
                {weatherData.description}
              </p>
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
