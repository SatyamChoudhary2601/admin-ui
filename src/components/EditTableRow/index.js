import styles from "./index.module.css";
import checkIcon from "../../assets/icons/check.png";
import { useState } from "react";

const EditTableRow = ({ user, isActive, editHandler }) => {
    const [userData, setUserData] = useState(user)
    
    const onChangeHandler = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }
    return (
        <tr className={isActive ? styles.active : ""}>
            <td></td>
            <td>
                <input className={styles.input} type="text" name="name" value={userData.name} onChange={onChangeHandler} />
            </td>
            <td>
                <input className={styles.input} type="text" name="email" value={userData.email} onChange={onChangeHandler} />
            </td>
            <td>
                <input className={styles.input} type="text" name="role" value={userData.role} onChange={onChangeHandler} />
            </td>
            <td>
                <div className={styles.iconContainer}>
                    <img
                        src={checkIcon}
                        alt="edit icon"
                        className={styles.icon}
                        onClick={() => editHandler(userData)}
                    />
                </div>
            </td>
        </tr>
    );
};

export default EditTableRow;
