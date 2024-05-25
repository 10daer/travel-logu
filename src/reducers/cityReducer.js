export default function (state, action) {
  switch (action.type) {
    case "cities/ready":
      return {
        ...state,
        cities: action.payload,
        cityIsLoading: false,
      };
    case "city/ready":
      return {
        ...state,
        currentCity: action.payload,
        cityIsLoading: false,
      };
    case "city/created":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
        cityIsLoading: false,
      };
    case "city/deleted":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
        cityIsLoading: false,
      };
    case "error":
      return {
        ...state,
        error: action.payload,
        cityIsLoading: false,
      };
    case "message":
      return {
        ...state,
        error: action.payload,
      };

    case "load":
      return {
        ...state,
        cityIsLoading: true,
      };

    default:
      throw new Error("Unknown action type");
  }
}
