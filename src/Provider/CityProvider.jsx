import { createContext, useEffect, useReducer } from "react";

import { GlobalTypes } from "../../GlobalTypes";
import useUser from "../contexts/userContext";
import cityReducer from "../reducers/cityReducer";
import { fetchCities } from "../services/City/apiCities";

CitiesProvider.propTypes = GlobalTypes;

const CitiesContext = createContext();
const initState = {
  cities: [],
  currentCity: {},
  cityIsLoading: false,
};

function CitiesProvider({ children }) {
  const [{ currentCity, cityIsLoading, cities }, dispatchCity] = useReducer(
    cityReducer,
    initState
  );
  const { user } = useUser();

  useEffect(() => {
    if (!user) return;

    fetchCities(user, dispatchCity);
  }, [user]);

  return (
    <CitiesContext.Provider
      value={{
        cities,
        currentCity,
        cityIsLoading,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export { CitiesContext, CitiesProvider };
