import { Country } from "../App";
interface Props {
  country: Country;
}
const CountryItem = ({ country }: Props) => {
  return (
    <div className="country-card">
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital ? country.capital[0] : "N/A"}</p>
    </div>
  );
};

export default CountryItem;
