import styles from "./index.module.css";
import searchIcon from "../../assets/icons/searchIcon.png"

const SearchBar = ({
  type,
  value,
  onChange,
  name,
  id,
  placeholder
}) => {
  return (
    <div className={styles.searchBar}>
      <img src={searchIcon} className={styles.icon} alt="search icon" />
      <input
        type={type}
        value={value}
        onChange={onChange}
        name={name}
        id={id}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchBar;
