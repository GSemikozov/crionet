import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Country } from '@/types'
import { Globe2, Users, MapPin, Clock, Coins, Languages, Map } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

interface CountryDetailsCardProps {
  country: Country
}

const formatNumber = (num?: number) => {
  if (!num) return 'N/A';
  return num.toLocaleString();
};

interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const InfoRow = ({ icon, label, value }: InfoRowProps) => (
  <div className="flex items-center space-x-4 py-2">
    <div className="text-muted-foreground">{icon}</div>
    <div className="flex-1">
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <p className="text-base">{value}</p>
    </div>
  </div>
);

export default function CountryDetailsCard({ country }: CountryDetailsCardProps) {
  const { 
    languages = [], 
    currency = 'N/A',
    borders = [],
    timezones = [],
    population,
    area
  } = country

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
        <div className="flex items-center space-x-4">
          <div className="text-4xl">{country.emoji}</div>
          <div>
            <CardTitle className="text-2xl font-bold">{country.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{country.continent.name}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-6 grid gap-4">
        <div className="grid gap-6">
          <InfoRow
            icon={<MapPin className="w-5 h-5" />}
            label="Capital"
            value={country.capital || 'N/A'}
          />
          
          <Separator />
          
          <InfoRow
            icon={<Users className="w-5 h-5" />}
            label="Population"
            value={formatNumber(population)}
          />
          
          <Separator />
          
          <InfoRow
            icon={<Map className="w-5 h-5" />}
            label="Area"
            value={`${formatNumber(area)} km²`}
          />
          
          <Separator />
          
          <InfoRow
            icon={<Languages className="w-5 h-5" />}
            label="Languages"
            value={languages.map(lang => lang.name).join(', ') || 'N/A'}
          />
          
          <Separator />
          
          <InfoRow
            icon={<Coins className="w-5 h-5" />}
            label="Currency"
            value={currency}
          />
          
          <Separator />
          
          <InfoRow
            icon={<Globe2 className="w-5 h-5" />}
            label="Neighbouring Countries"
            value={borders.length > 0 ? borders.join(', ') : 'None'}
          />
          
          <Separator />
          
          <InfoRow
            icon={<Clock className="w-5 h-5" />}
            label="Time Zones"
            value={timezones.length > 0 ? timezones.join(', ') : 'N/A'}
          />
        </div>
      </CardContent>
    </Card>
  )
}
