import { PaginationProps } from "../types/types";

export const usePaginator=({pagination,fetchAgain}: PaginationProps)=>{
    const handlePageChange = (newPage : number) => {
    if (newPage >= 1 && newPage <= pagination.lastPage) {
      fetchAgain(newPage);
    }
  };
  return {handlePageChange}
}
