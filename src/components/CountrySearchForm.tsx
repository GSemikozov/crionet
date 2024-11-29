import { useRef } from 'react'
import { SearchIcon, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface CountrySearchFormProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export default function CountrySearchForm({ onSearch, isLoading }: CountrySearchFormProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const query = inputRef.current?.value || ''
    onSearch(query)
  }

  const buttonIcon = isLoading ? (
    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
  ) : (
    <SearchIcon className="w-4 h-4 mr-2" />
  );

  const buttonText = isLoading ? 'Searching...' : 'Search';

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <Input
        ref={inputRef}
        type="text"
        placeholder="Search for a country..."
        className="flex-grow"
        disabled={isLoading}
      />
      <Button type="submit" disabled={isLoading}>
        {buttonIcon}
        {buttonText}
      </Button>
    </form>
  )
}
