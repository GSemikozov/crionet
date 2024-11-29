import { Country } from './index';

export interface CountryQueryResponse {
  countries: Country[];
}

export interface CountryQueryVariables {
  name?: string;
  region?: string;
  language?: string;
}
