import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

type SortBy = 'name' | 'population' | 'area';

interface CountryFiltersProps {
  sortBy: SortBy;
  filterRegion: string;
  filterLanguage: string;
  regions: string[];
  languages: string[];
  setSortBy: (sortBy: SortBy) => void;
  setFilterRegion: (filterRegion: string) => void;
  setFilterLanguage: (filterLanguage: string) => void;
  clearFilters: () => void;
  isLoading: boolean;
}

export default function CountryFilters({
  sortBy,
  filterRegion,
  filterLanguage,
  regions,
  languages,
  setSortBy,
  setFilterRegion,
  setFilterLanguage,
  clearFilters,
  isLoading
}: CountryFiltersProps) {
  const hasActiveFilters = sortBy !== 'name' || filterRegion !== 'all' || filterLanguage !== 'all';

  return (
    <div className="flex flex-wrap items-center gap-1">
      <Select value={sortBy} onValueChange={setSortBy} disabled={isLoading}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="name">Name</SelectItem>
          <SelectItem value="population">Population</SelectItem>
          <SelectItem value="area">Area</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filterRegion}
        onValueChange={setFilterRegion}
        disabled={isLoading}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by region" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All regions</SelectItem>
          {regions.map((region) => (
            <SelectItem key={region} value={region}>
              {region}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filterLanguage}
        onValueChange={setFilterLanguage}
        disabled={isLoading}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All languages</SelectItem>
          {languages.map((language) => (
            <SelectItem key={language} value={language}>
              {language}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {hasActiveFilters && (
        <Button
          variant="outline"
          size="icon"
          onClick={clearFilters}
          disabled={isLoading}
          title="Clear filters"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
