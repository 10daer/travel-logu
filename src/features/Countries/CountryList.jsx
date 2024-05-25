import useCities from "../../contexts/citiesContext";
import Message from "../../components/Message";
import Spinner from "../../components/Spinner";
import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";

function CountryList() {
  const { cities, cityIsLoading } = useCities();

  if (cityIsLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Click on the map to add a country you have visited" />
    );

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country)) {
      return [...arr, { country: city.country, emoji: city.emoji }];
    } else {
      return arr;
    }
  }, []);

  return (
    <ul className={styles.countryList}>
      {[...countries].map((country, i) => (
        <CountryItem country={country} key={i} />
      ))}
    </ul>
  );
}

export default CountryList;
