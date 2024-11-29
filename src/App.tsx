import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './lib/apollo';
import CountriesContainer from './containers/CountriesContainer';
import SearchContainer from './containers/SearchContainer';
import CountryDetailsContainer from './containers/CountryDetailsContainer';
import Layout from './components/Layout';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useAppSelector } from './store/hooks';

function App() {
  const selectedCountry = useAppSelector((state) => state.countries.selectedCountry);

  return (
    <ErrorBoundary>
      <ApolloProvider client={apolloClient}>
        <Layout title="Weather App">
          {selectedCountry ? (
            <CountryDetailsContainer />
          ) : (
            <>
              <SearchContainer />
              <CountriesContainer />
            </>
          )}
        </Layout>
      </ApolloProvider>
    </ErrorBoundary>
  );
}

export default App;
