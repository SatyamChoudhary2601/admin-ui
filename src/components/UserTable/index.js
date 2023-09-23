import UserRow from "../UserRow";
import styles from "./index.module.css";
import Button from "../Button";
import { useEffect } from "react";
import trashIcon from "../../assets/icons/trash.png";
import { ZERO_VALUE } from "../../utils/constants";

const UserTable = ({
    users,
    firstIndex,
    lastIndex,
    editHandler,
    deleteRowHandler,
    selectRowHandler,
    selectedRow,
    setSelectedRow,
    isAllChecked,
    setIsAllChecked,
}) => {
    // slicing table row data according to firstIndex and lastIndex
    const slicedUsers = users?.slice(firstIndex, lastIndex);

    // Logic for header checkbox 
    useEffect(() => {
        if (selectedRow?.length !== slicedUsers?.length) {
            setIsAllChecked(false);
        } else {
            setIsAllChecked(true);
        }
    }, [selectedRow, slicedUsers]);

    // Logic for isAllChecked and setting selectedRow
    const handleSelectAllChange = () => {
        if (!isAllChecked) {
            setSelectedRow([...slicedUsers]);
        } else {
            setSelectedRow([]);
        }
        setIsAllChecked(!isAllChecked);
    };
    return (
        <div className={styles.tableContainer}>
            <p className={styles.select}>
                <span>{selectedRow.length}</span> items selected
            </p>
            <table className={styles.table} cellSpacing={0} cellPadding={10}>
                <thead>
                    <tr>
                        <th>
                            <input
                                type="checkbox"
                                checked={isAllChecked}
                                onChange={(e) => handleSelectAllChange()}
                            />
                        </th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {slicedUsers?.map((user) => (
                        <UserRow
                            user={user}
                            key={user.id}
                            selectRowHandler={selectRowHandler}
                            selectedRow={selectedRow}
                            deleteRowHandler={deleteRowHandler}
                            editHandler={editHandler}
                        />
                    ))}
                </tbody>
                <tfoot className={styles.tfoot}>
                    <tr>
                        <td className={styles.deleteBtnRow}>
                            <Button
                                classNames={styles.deleteBtn}
                                onClick={() => deleteRowHandler(users, "deleteSelected")}
                                disabled={selectedRow.length === ZERO_VALUE}
                            >
                                Delete Selected
                            </Button>
                            <img
                                src={trashIcon}
                                alt="delete icon"
                                className={styles.icon}
                                onClick={() => deleteRowHandler(users, "deleteSelected")}
                            />
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default UserTable;
