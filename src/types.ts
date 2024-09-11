import { HttpContext, HttpHeaders, HttpParams } from "@angular/common/http";

export interface Options {
  headers?: HttpHeaders | { [header: string]: string | string[] };
  observe?: 'body';
  context?: HttpContext;
  params?: HttpParams | { [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean> };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  transferCache?: { includeHeaders?: string[] } | boolean;
}

export interface Countries {
    countries: Country[];
    totalCountries: number; // Add this line to match the server response

}

export interface Flag {
    svg: string;
    png: string;
  }
  
export interface Currency {
    code: string;
    name: string;
    symbol: string;
  }
  
  export interface Language {
    iso639_1: string;
    iso639_2: string;
    name: string;
    nativeName: string;
  }
  
  export interface Translation {
    [key: string]: string;
  }
  
  export interface RegionalBloc {
    acronym: string;
    name: string;
  }
  
  export interface Country {
    name: string;
    topLevelDomain: string[];
    alpha2Code: string;
    alpha3Code: string;
    callingCodes: string[];
    capital: string;
    altSpellings: string[];
    subregion: string;
    region: string;
    population: number;
    latlng: [number, number];
    demonym: string;
    area: number;
    timezones: string[];
    borders?: string[];
    nativeName: string;
    numericCode: string;
    flags: Flag;
    currencies: Currency[];
    languages: Language[];
    translations: Translation;
    flag: string;
    regionalBlocs: RegionalBloc[];
    cioc: string;
    independent: boolean;
  }
  
export interface PaginationParams {
[param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
page: number;
perPage: number;
}