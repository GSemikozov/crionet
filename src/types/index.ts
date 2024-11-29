export interface Country {
  name: string
  capital?: string
  awsRegion?: string
  languages: {
    code: string
    name: string
  }[]
  code: string
  continent: {
    name: string
  }
  currency: string
  phone: string
  emoji: string
  states: {
    code: string
    name: string
  }[]
  population?: number
  area?: number
  borders?: string[] // Array of country codes
  timezones?: string[]
}
