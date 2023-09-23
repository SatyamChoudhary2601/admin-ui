import { useState } from "react";
import editIcon from "../../assets/icons/edit.png";
import trashIcon from "../../assets/icons/trash.png";
import styles from "./index.module.css";
import EditTableRow from "../EditTableRow";

const UserRow = ({
  user,
  editHandler,
  deleteRowHandler,
  selectRowHandler,
  selectedRow,
}) => {
  const isActive = selectedRow.some((row) => row.id === user.id);
  const [isRowEditable, setIsRowEditable] = useState(false);
  const onChangeHandler = () => {
    selectRowHandler(user);
  }
  return isRowEditable ? (
    <EditTableRow
      user={user}
      isActive={isActive}
      editHandler={(user) => {
        editHandler(user);
        setIsRowEditable(false);
      }}
    />
  ) : (
    <tr
      className={isActive ? styles.active : ""}
      onClick={onChangeHandler}>
      <td>
        <input type="checkbox" checked={isActive} onChange={() => { }} />
      </td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td onClick={(e) => e.stopPropagation()}>
        <div className={styles.iconContainer}>
          <img
            src={editIcon}
            alt="edit icon"
            className={styles.icon}
            onClick={() => setIsRowEditable((isRowEditable) => !isRowEditable)}
          />
          <img
            src={trashIcon}
            alt="delete icon"
            className={styles.icon}
            onClick={() => deleteRowHandler(user, "singleDelete")}
          />
        </div>
      </td>
    </tr>
  );
};

export default UserRow;
