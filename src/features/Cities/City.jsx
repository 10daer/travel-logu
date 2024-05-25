import { useEffect } from "react";
import { useParams } from "react-router-dom";

import useCities from "../../contexts/citiesContext";
import { fetchCity } from "../../services/City/apiCities";
import useUser from "../../contexts/userContext";

import ButtonBack from "../../components/ButtonBack";
import Spinner from "../../components/Spinner";
import styles from "./City.module.css";
import { formatDate } from "../../utils/helpers";

function City() {
  const { id } = useParams();
  const { user } = useUser();
  const { currentCity, dispatchCity, cityIsLoading } = useCities();
  const { cityName, emoji, date, notes } = currentCity;

  useEffect(
    function () {
      if (id === currentCity.id) return;

      fetchCity(user, dispatchCity, id);
    },
    [dispatchCity, id, currentCity, user]
  );

  if (cityIsLoading) return <Spinner />;
  // To clear the previous city details
  if (id !== currentCity.id) return;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>
          {date ? formatDate(date.toDate().toLocaleString()) : formatDate(null)}
        </p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <ButtonBack />
      </div>
    </div>
  );
}

export default City;
