import { CountriesListSkeleton } from '@/components/CountriesListSkeleton';
import CountryCard from '@/components/CountryCard';
import CountryFiltersContainer from './CountryFiltersContainer';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectFilteredAndSortedCountries, setSelectedCountry } from '@/store/slices/countriesSlice';
import { Country } from '@/types';
import ErrorMessage from '@/components/ErrorMessage';

export default function CountriesContainer() {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector(state => state.countries);
  const sortedAndFilteredCountries = useAppSelector(selectFilteredAndSortedCountries);

  const handleCountrySelect = (country: Country) => {
    dispatch(setSelectedCountry(country));
  };

  const renderContent = () => {
    if (isLoading) {
      return <CountriesListSkeleton />;
    }

    if (error) {
      return (
        <div className="col-span-full">
          <ErrorMessage
            title="Failed to load countries"
            message={error}
          />
        </div>
      );
    }

    if (sortedAndFilteredCountries.length === 0) {
      return (
        <div className="col-span-full text-center py-8 text-muted-foreground">
          <p>No countries found matching your filters</p>
        </div>
      );
    }

    return sortedAndFilteredCountries.map((country) => (
      <CountryCard
        key={country.name}
        country={country}
        onSelect={handleCountrySelect}
      />
    ));
  };

  return (
    <div>
      <CountryFiltersContainer />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
        {renderContent()}
      </div>
    </div>
  );
}
