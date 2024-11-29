import { Country } from '@/types';
import { apolloClient } from '@/lib/apollo';
import { SEARCH_COUNTRIES } from './graphql/queries';

interface CountryQueryResponse {
  countries: Country[];
}

export async function searchCountriesByName(query: string): Promise<Country[]> {
  const { data } = await apolloClient.query<CountryQueryResponse>({
    query: SEARCH_COUNTRIES,
    variables: {
      name: query
    }
  });

  return data.countries;
}
