import useCities from "../../contexts/citiesContext";

import Message from "../../components/Message";
import Spinner from "../../components/Spinner";

import CityItem from "./CityItem";
import styles from "./CityList.module.css";

function CityList() {
  const { cities, cityIsLoading } = useCities();

  if (cityIsLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Click on the map to add a city you have visited" />
    );

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
