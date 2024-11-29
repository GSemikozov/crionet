import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { clearSelectedCountry } from '@/store/slices/countriesSlice';
import CountryDetailsCard from '@/components/CountryDetailsCard';
import CapitalWeatherContainer from './CapitalWeatherContainer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function CountryDetailsContainer() {
  const dispatch = useAppDispatch();
  const selectedCountry = useAppSelector((state) => state.countries.selectedCountry);

  if (!selectedCountry) {
    return null;
  }

  return (
    <div className='flex flex-col space-y-4 w-full max-w-2xl mx-auto'>
      <Button
        variant="ghost"
        className="w-full pl-0 hover:pl-2 transition-all"
        onClick={() => dispatch(clearSelectedCountry())}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to countries
      </Button>

      <CapitalWeatherContainer capital={selectedCountry.capital} />
      <CountryDetailsCard country={selectedCountry} />
    </div>
  );
}
