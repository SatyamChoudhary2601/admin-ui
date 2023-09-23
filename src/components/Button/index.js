import clsx from "clsx";
import styles from "./index.module.css";

const Button = ({ children, onClick, classNames, disabled }) => {
    return (
        <button
            onClick={onClick}
            className={clsx(styles.button, classNames)}
            disabled={disabled}>
            {children}
        </button>
    );
};

export default Button;
