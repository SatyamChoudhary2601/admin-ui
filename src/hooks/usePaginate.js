import { NUMBER_OF_RECORDS_PER_PAGE, ONE_VALUE } from "../utils/constants";

export const usePaginate = () => {
    const calculatePagination = (currentPage, userData) => {
        const firstIndex = (currentPage - 1) * NUMBER_OF_RECORDS_PER_PAGE;
        const lastIndex = NUMBER_OF_RECORDS_PER_PAGE * currentPage;
        const numberOfPages = Math.ceil(userData?.length / NUMBER_OF_RECORDS_PER_PAGE);

        return {
            firstIndex,
            lastIndex,
            numberOfPages,
        };
    };

    return calculatePagination;
}