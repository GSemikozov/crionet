import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { searchCountries } from '@/store/slices/countriesSlice';
import CountrySearchForm from '@/components/CountrySearchForm';

export default function SearchContainer() {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.countries);

  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return
    dispatch(searchCountries(searchQuery))
  }

  return <CountrySearchForm onSearch={handleSearch} isLoading={isLoading} />;
}
