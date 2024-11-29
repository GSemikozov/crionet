export interface Language {
  code: string;
  name: string;
  native: string;
}

export interface Continent {
  code: string;
  name: string;
}

export interface Country {
  code: string;
  name: string;
  native: string;
  capital: string;
  emoji: string;
  currency: string;
  languages: Language[];
  continent: Continent;
  area: number;
  population: number;
}
