import clsx from "clsx";
import Button from "../Button";
import styles from "./index.module.css";

const Pagination = ({
    currentPage,
    setCurrentPage,
    numberOfPages,
    isAllChecked,
    setSelectedRow,
}) => {

    // if isAllChecked is true, setSelectedRow to empty array []. i.e. if currentPage(pagination) value is changed 
    const checkValidation = () => {
        if (isAllChecked) {
            setSelectedRow([]);
        }
    };

    // Logic for pagination changes
    const pageHandler = (index) => {
        checkValidation();
        setCurrentPage(index + 1);
    };

    // Logic for previous page changes
    const previousPageHandler = (currentPage, val) => {
        checkValidation();
        if (currentPage > 1 && val === "prev") {
            setCurrentPage(currentPage - 1);
        } else {
            setCurrentPage(1);
        }
    };

    // Logic for next page changes
    const nextPageHandler = (currentPage, val) => {
        checkValidation();
        if (currentPage < numberOfPages - 1 && val === "next") {
            setCurrentPage(currentPage + 1);
        } else {
            setCurrentPage(numberOfPages);
        }
    };
    return (
        <div className={styles.pagination}>
            <Button
                classNames={styles.btn}
                onClick={() =>
                    previousPageHandler(currentPage, "first")
                }>{`<<`}</Button>
            <Button
                classNames={styles.btn}
                onClick={() => previousPageHandler(currentPage, "prev")}>{`<`}</Button>
            {Array.from({ length: numberOfPages }).map((item, index) => (
                <Button
                    onClick={() => pageHandler(index)}
                    key={index}
                    classNames={clsx(
                        styles.btn,
                        currentPage === index + 1 && styles.active
                    )}>
                    {index + 1}
                </Button>
            ))}
            <Button
                classNames={styles.btn}
                onClick={() => nextPageHandler(currentPage, "next")}>{`>`}</Button>
            <Button
                classNames={styles.btn}
                onClick={() => nextPageHandler(currentPage, "last")}>{`>>`}</Button>
        </div>
    );
};

export default Pagination;
