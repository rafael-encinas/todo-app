import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateRequestPage } from "../pagination/paginationSlice";

export function PageButton({ getNewData, pageNum }){
    const currentPageStore = useSelector((state)=>state.pagination.pagination.current_page)
    const [currentPage, setCurrentPage] = useState(currentPageStore);
    const dispatch = useDispatch();

    function changePagination(){
        setCurrentPage(pageNum);
        console.log("Going to page: " + pageNum);
        dispatch(updateRequestPage(currentPage))

        //Get request here!
        getNewData();
    }

    return(
      <button onClick={changePagination} className={currentPage==pageNum? 'currentPage':"notCurrentPage" } >{pageNum}</button>
    );
  }