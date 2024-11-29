import CountryFilters from '@/components/CountryFilters';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  selectAllRegions,
  selectAllLanguages,
  setSortBy,
  setFilterRegion,
  setFilterLanguage,
  selectSortBy,
  selectFilterRegion,
  selectFilterLanguage,
  clearFilters
} from '@/store/slices/countriesSlice';

export default function CountryFiltersContainer() {
  const dispatch = useAppDispatch();
  const regions = useAppSelector(selectAllRegions);
  const languages = useAppSelector(selectAllLanguages);
  const sortBy = useAppSelector(selectSortBy);
  const filterRegion = useAppSelector(selectFilterRegion);
  const filterLanguage = useAppSelector(selectFilterLanguage);
  const { isLoading } = useAppSelector(state => state.countries);

  return (
    <div className="mb-4">
      <CountryFilters
        regions={regions}
        languages={languages}
        setFilterLanguage={(language) => dispatch(setFilterLanguage(language))}
        setFilterRegion={(region) => dispatch(setFilterRegion(region))}
        clearFilters={() => dispatch(clearFilters())}
        isLoading={isLoading}
        sortBy={sortBy}
        filterRegion={filterRegion}
        filterLanguage={filterLanguage}
        setSortBy={(sort) => dispatch(setSortBy(sort))}
      />
    </div>
  );
}
