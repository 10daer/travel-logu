// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useReducer } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./Form.module.css";
import Button from "./Button";
import ButtonBack from "./ButtonBack";
import { usePosition } from "../hooks/usePosition";
import Message from "./Message";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";

import formReducer from "../reducers/formReducer";
import useUser from "../contexts/userContext";
import { createCity } from "../services/City/apiCities";
import { BASE_URL } from "../utils/constants";

const initState = {
  country: "",
  cityName: "",
  date: new Date(),
  notes: "",
  formIsLoading: false,
  formError: null,
  emoji: "",
};

function Form() {
  const [posLat, posLng] = usePosition();
  const { userIsLoading } = useUser();
  const navigate = useNavigate();
  const [
    { cityName, country, emoji, date, notes, formError, formIsLoading },
    dispatch,
  ] = useReducer(formReducer, initState);

  useEffect(
    function () {
      async function getLocale() {
        if (!posLat && !posLng) return;
        dispatch({ type: "loading" });

        try {
          const res = await fetch(
            `${BASE_URL}latitude=${posLat}&longitude=${posLng}`
          );
          const data = await res.json();
          if (!data.countryCode)
            throw new Error(
              "That doesn't seem to be a city. Click somewhere else! 🙂"
            );
          dispatch({ type: "fillForm", payload: data });
        } catch (error) {
          dispatch({ type: "error", payload: error.message });
        }
      }
      getLocale();
    },
    [posLat, posLng]
  );

  function handleSubmit(e) {
    e.preventDefault();
    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat: posLat, lng: posLng },
    };
    createCity(newCity);
    navigate("/app/cities");
  }

  if (formIsLoading) return <Spinner />;
  if (!posLat && !posLng)
    return <Message message="Start by clicking somewhere on the map" />;
  if (formError) return <Message message={formError} />;

  return (
    <form
      className={`${styles.form} ${userIsLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => dispatch({ type: "name", payload: e.target.value })}
          value={cityName}
          className={styles.input__form}
        />
        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          onChange={(date) => dispatch({ type: "date", payload: date })}
          selected={date}
          format="dd/mm/yyyy"
          className={styles.input__form}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => dispatch({ type: "note", payload: e.target.value })}
          value={notes}
          className={styles.input__text}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <ButtonBack />
      </div>
    </form>
  );
}

export default Form;
