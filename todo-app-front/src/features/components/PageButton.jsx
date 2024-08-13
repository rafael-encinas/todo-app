import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateRequestPage } from "../pagination/paginationSlice";

export function PageButton({ onGetFilteredData, pageNum }){
    const current_page = useSelector((state)=>state.pagination.pagination.current_page)
    const filters = useSelector((state) => state.todos.filters);
    const sort = useSelector((state) => state.todos.sort)
    //const page = useSelector((state)=> state.pagination.requestPage.page);
    const [currentPage, setCurrentPage] = useState(current_page);
    const dispatch = useDispatch();

    function changePagination(){
        setCurrentPage(pageNum);
        console.log("Going to page: " + pageNum);
        dispatch(updateRequestPage(pageNum))

        //Get request here!
        onGetFilteredData(filters, sort, pageNum);
    }

    return(
      <button onClick={changePagination} className={current_page==pageNum? 'currentPage':"notCurrentPage" } >{pageNum}</button>
    );
  }