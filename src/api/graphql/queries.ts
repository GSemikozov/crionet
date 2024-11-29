import { gql } from '@apollo/client';

export const SEARCH_COUNTRIES = gql`
  query SearchCountries($name: String) {
    countries(filter: { name: { regex: $name } }) {
      code
      name
      native
      capital
      emoji
      currency
      languages {
        code
        name
        native
      }
      continent {
        code
        name
      }
    }
  }
`;
