import { useState, useEffect } from "react";
import CountryItem from "./component/Country";

// Create a simple React application that displays a list of countries and their capitals
// The application should have the following features:

// The list of countries and capitals should be fetched from an API
// Each country should be displayed in a separate component
// The user should be able to filter the list by capital

/**
  To fetch all countries use the '/all' endpoint
 */

const BASE_URL = "https://restcountries.com/v3.1";
/**
  To filter by capital city, use the '/capital/{capital}' endpoint
 */

const FILTERABLE_CAPITALS = [
  "Tallinn",
  "Helsinki",
  "Stockholm",
  "Oslo",
  "Copenhagen",
  "Reykjavik",
] as const;
type Capital = (typeof FILTERABLE_CAPITALS)[number];

export interface Country {
  // I export the inteface so that i can use it in the CountryItem componenet
  name: {
    common: string;
  };
  capital: string;
}

export default function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [filteredCapital, setFilterByCapital] = useState<Capital | "">("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(`${BASE_URL}/all`);
        if (!response.ok) {
          throw new Error("invalid, could not fetch countries");
        }
        const data: Country[] = await response.json();
        setCountries(data);
        setFilteredCountries(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    if (filteredCapital) {
      const fetchCapital = async () => {
        try {
          const response = await fetch(
            `${BASE_URL}/capital/${filteredCapital}`
          );
          if (!response.ok) {
            throw new Error("invalid, could not fetch countries");
          }
          const data: Country[] = await response.json();
          setCountries(data);
          setFilteredCountries(data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchCapital();
    } else {
      setFilteredCountries(countries);
    }
  }, [filteredCapital, countries]);

  return (
    <div className="App">
      <h1>React Interview</h1>

      <div>
        <label htmlFor="capital">Capital of Countries: </label>
        <select
          id="capital"
          value={filteredCapital}
          onChange={(e) => setFilterByCapital(e.target.value as Capital | "")}
        >
          <option value="">All</option>
          {FILTERABLE_CAPITALS.map((capital, index) => (
            <option key={index} value={capital}>
              {capital}
            </option>
          ))}
        </select>
      </div>
      <div className="countries-list">
        {filteredCountries.map((country) => (
          <CountryItem key={country.name.common} country={country} />
        ))}
      </div>
    </div>
  );
}
