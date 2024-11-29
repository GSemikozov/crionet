interface RestCountry {
  name: {
    common: string;
  };
  population: number;
  area: number;
  cca2: string; // This is the country code that matches our GraphQL 'code' field
  borders: string[];
  timezones: string[];
}

export async function getCountriesInfo(): Promise<Record<string, { 
  population: number; 
  area: number;
  borders: string[];
  timezones: string[];
}>> {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all?fields=name,population,area,cca2,borders,timezones');
    const countries: RestCountry[] = await response.json();
    
    // Create a map of country code to country info
    return countries.reduce((acc, country) => {
      acc[country.cca2] = {
        population: country.population,
        area: country.area,
        borders: country.borders || [],
        timezones: country.timezones || []
      };
      return acc;
    }, {} as Record<string, { 
      population: number; 
      area: number;
      borders: string[];
      timezones: string[];
    }>);
  } catch (error) {
    console.error('Failed to fetch countries info:', error);
    return {};
  }
}
