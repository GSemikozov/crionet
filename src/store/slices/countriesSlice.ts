import { createSlice, createAsyncThunk, createSelector, PayloadAction } from '@reduxjs/toolkit'
import { searchCountriesByName } from '@/api/countries'
import { getCountriesInfo } from '@/api/restCountries'
import { Country } from '@/types'

interface CountriesState {
  list: Country[]
  selectedCountry: Country | null
  isLoading: boolean
  error: string | null
  sortBy: 'name' | 'population' | 'area'
  filterRegion: string
  filterLanguage: string
  countriesInfo: Record<string, {
    population: number
    area: number
    borders: string[]
    timezones: string[]
  }>
}

const initialState: CountriesState = {
  list: [],
  selectedCountry: null,
  isLoading: false,
  error: null,
  sortBy: 'name',
  filterRegion: 'all',
  filterLanguage: 'all',
  countriesInfo: {}
}

export const searchCountries = createAsyncThunk(
  'countries/searchCountries',
  async (query: string, { dispatch }) => {
    const countries = await searchCountriesByName(query);
    // After getting countries, fetch additional info
    dispatch(fetchCountriesInfo());
    return countries;
  }
)

export const fetchCountriesInfo = createAsyncThunk(
  'countries/fetchInfo',
  async () => {
    return getCountriesInfo();
  }
);

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    setSelectedCountry: (state, action: PayloadAction<Country>) => {
      state.selectedCountry = action.payload
    },
    clearSelectedCountry: (state) => {
      state.selectedCountry = null
    },
    clearCountries: (state) => {
      state.list = []
      state.selectedCountry = null
      state.error = null
    },
    setSortBy: (state, action: PayloadAction<CountriesState['sortBy']>) => {
      state.sortBy = action.payload
    },
    setFilterRegion: (state, action: PayloadAction<string>) => {
      state.filterRegion = action.payload
    },
    setFilterLanguage: (state, action: PayloadAction<string>) => {
      state.filterLanguage = action.payload
    },
    clearFilters: (state) => {
      state.sortBy = 'name'
      state.filterRegion = 'all'
      state.filterLanguage = 'all'
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchCountries.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(searchCountries.fulfilled, (state, action) => {
        state.isLoading = false
        state.list = action.payload
      })
      .addCase(searchCountries.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'Failed to fetch countries'
        state.list = []
      })
      .addCase(fetchCountriesInfo.fulfilled, (state, action) => {
        state.countriesInfo = action.payload;
        // Update the list with additional data
        state.list = state.list.map(country => ({
          ...country,
          population: state.countriesInfo[country.code]?.population,
          area: state.countriesInfo[country.code]?.area,
          borders: state.countriesInfo[country.code]?.borders,
          timezones: state.countriesInfo[country.code]?.timezones
        }));
      });
  }
})

export const {
  setSelectedCountry,
  clearSelectedCountry,
  clearCountries,
  setSortBy,
  setFilterRegion,
  setFilterLanguage,
  clearFilters,
} = countriesSlice.actions

// Selectors
const selectCountriesState = (state: { countries: CountriesState }) => state.countries;

export const selectAllCountries = createSelector(
  [selectCountriesState],
  (countries) => countries.list
);

export const selectAllRegions = createSelector(
  [selectAllCountries],
  (countries) => {
    const regions = new Set(countries.map(country => country.continent.name));
    return Array.from(regions).sort();
  }
);

export const selectAllLanguages = createSelector(
  [selectAllCountries],
  (countries) => {
    const languages = new Set(
      countries.flatMap(country => country.languages.map(lang => lang.name))
    );
    return Array.from(languages).sort();
  }
);

export const selectSortBy = createSelector(
  [selectCountriesState],
  (countries) => countries.sortBy
);

export const selectFilterRegion = createSelector(
  [selectCountriesState],
  (countries) => countries.filterRegion
);

export const selectFilterLanguage = createSelector(
  [selectCountriesState],
  (countries) => countries.filterLanguage
);

export const selectFilteredAndSortedCountries = createSelector(
  [selectAllCountries, selectSortBy, selectFilterRegion, selectFilterLanguage],
  (countries, sortBy, filterRegion, filterLanguage) => {
    let filteredCountries = [...countries];

    if (filterRegion !== 'all') {
      filteredCountries = filteredCountries.filter(
        country => country.continent.name === filterRegion
      );
    }

    if (filterLanguage !== 'all') {
      filteredCountries = filteredCountries.filter(country =>
        country.languages.some(lang => lang.name === filterLanguage)
      );
    }

    return filteredCountries.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'population':
          return (b.population || 0) - (a.population || 0);
        case 'area':
          return (b.area || 0) - (a.area || 0);
        default:
          return 0;
      }
    });
  }
);

export default countriesSlice.reducer
