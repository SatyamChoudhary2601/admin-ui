import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import SearchBar from "../SearchBar";
import styles from "./index.module.css";
import UserTable from "../UserTable";
import { CURRENT_PAGE, URLs } from "../../utils/constants";
import Pagination from "../Pagination";
import { toast } from "react-toastify";
import { config } from "../../environment";
import Spinner from "../Spinner";
import { usePaginate } from "../../hooks/usePaginate";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedRow, setSelectedRow] = useState([]);
  const [currentPage, setCurrentPage] = useState(CURRENT_PAGE);
  const [isAllChecked, setIsAllChecked] = useState(false);

  // Custom hook for fetching data
  const url = `${config.BASE_URL}${URLs.USER_DETAILS_URL}`;
  const { isLoading, data, error } = useFetch(url);

  // Custom Pagination hook
  const calculatePagination = usePaginate();
  const { firstIndex, lastIndex, numberOfPages } = calculatePagination(currentPage, users);

  // Setting data in state - users
  useEffect(() => {
    setUsers(data);
  }, [data]);

  // Search logic on email, name and role fields
  const searchingUser = () => {
    const filterSearchUser = data?.filter((item) => {
      const { name, email, role } = item;
      const search = searchText.toLowerCase();
      return (
        name.toLowerCase().includes(search) ||
        email.toLowerCase().includes(search) ||
        role.toLowerCase().includes(search)
      );
    });
    setUsers(filterSearchUser);
    setCurrentPage(1);
  };

  // calling search logic in useEffect
  useEffect(() => {
    searchingUser();
  }, [data, searchText]);

  // Showing error message if API fails
  if (error) {
    toast.error(error.message);
    return <div className={styles.error}>{error.message}</div>;
  }

  // Setting search input text
  const searchOnChangeHandler = (event) => {
    setSearchText(event.target.value);
  };

  // Logic for selecting a row
  const selectRowHandler = (data) => {
    const row = [...selectedRow];
    const findIndex = row.findIndex((item) => item.id === data.id);
    if (findIndex < 0) {
      setSelectedRow((selectedRow) => [...selectedRow, data]);
    } else {
      row.splice(findIndex, 1);
      setSelectedRow(row);
    }
  };

  // Logic for deleting single and multiple rows
  const deleteRowHandler = (userId, type) => {
    if (type === "deleteSelected") {
      const deleteSelectedUser = users.filter(
        (obj1) => !selectedRow.some((obj2) => obj1.id === obj2.id)
      );
      toast.success(`${selectedRow.length} users is removed successfully!`);
      setUsers(deleteSelectedUser);
      setSelectedRow([]);
    } else {
      const singleDelete = users.filter((user) => user.id !== userId.id);
      toast.success(`${userId.name} is removed successfully!`);
      setUsers(singleDelete);
    }
  };

  // Logic for edit row
  const editHandler = (editData) => {
    const findIndex = users.findIndex((user) => user.id === editData.id);
    if (findIndex !== -1) {
      const row = [...users];
      row[findIndex] = editData;
      setUsers(row);
    }
  };
  return isLoading ? (
    <div className={styles.loading}>
      <Spinner />
    </div>
  ) : (
    <div className={styles.dashboard}>
      <SearchBar
        type="text"
        value={searchText}
        onChange={searchOnChangeHandler}
        name="search"
        id="search"
        placeholder="Search by name, email or role..."
      />
      <UserTable
        users={users}
        selectRowHandler={selectRowHandler}
        selectedRow={selectedRow}
        setSelectedRow={setSelectedRow}
        isAllChecked={isAllChecked}
        setIsAllChecked={setIsAllChecked}
        deleteRowHandler={deleteRowHandler}
        editHandler={editHandler}
        firstIndex={firstIndex}
        lastIndex={lastIndex}
      />
      <Pagination
        isAllChecked={isAllChecked}
        setSelectedRow={setSelectedRow}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        numberOfPages={numberOfPages}
      />
    </div>
  );
};

export default Dashboard;
