import { Country } from '@/types';

interface CountryCardProps {
  country: Country;
  onSelect: (country: Country) => void;
}

const formatNumber = (num?: number) => {
  if (!num) return 'N/A';
  return num.toLocaleString();
};

export default function CountryCard({ country, onSelect }: CountryCardProps) {
  return (
    <div
      className="min-w-[200px] border rounded-lg p-4 cursor-pointer hover:bg-gray-100"
      onClick={() => onSelect(country)}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">{country.emoji}</span>
        <h3 className="font-semibold">{country.name}</h3>
      </div>

      <div className="space-y-1 text-sm text-gray-600">
        <p><span className="font-medium">Capital:</span> {country.capital || 'N/A'}</p>
        <p><span className="font-medium">Continent:</span> {country.continent.name}</p>
        <p><span className="font-medium">Currency:</span> {country.currency}</p>
        <p>
          <span className="font-medium">Languages:</span>{' '}
          {country.languages.map(lang => lang.name).join(', ')}
        </p>
        <p><span className="font-medium">Population:</span> {formatNumber(country.population)}</p>
        <p><span className="font-medium">Area:</span> {formatNumber(country.area)} km²</p>
      </div>
    </div>
  );
}
