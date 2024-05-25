import { GlobalTypes } from "../../../GlobalTypes";
import styles from "./CountryItem.module.css";

CountryItem.propTypes = GlobalTypes;

function CountryItem({ country }) {
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
