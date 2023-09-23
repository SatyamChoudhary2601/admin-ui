import styles from "./index.module.css";

const Spinner = () => {
  return (
    <div className={styles.spinner}>
      <span className={styles.loader}></span>
      loading...
    </div>
  );
};

export default Spinner;
