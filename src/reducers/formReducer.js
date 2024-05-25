import { convertToEmoji } from "../utils/helpers";

export default function (state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, formIsLoading: true, formError: "" };

    case "error":
      return { ...state, formError: action.payload, formIsLoading: false };

    case "fillForm":
      return {
        ...state,
        cityName: action.payload.city || action.payload.locality || "",
        country: action.payload.countryName,
        emoji: convertToEmoji(action.payload.countryCode),
        formIsLoading: false,
      };

    case "note":
      return { ...state, notes: action.payload };

    case "name":
      return { ...state, cityName: action.payload };

    case "date":
      return { ...state, date: action.payload };

    default:
      throw new Error("Unknown Action");
  }
}
