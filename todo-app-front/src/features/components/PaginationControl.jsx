import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PageButton } from "./PageButton";
import { updateRequestPage } from "../pagination/paginationSlice";

export function PaginationControl({ onGetFilteredData }) {
  const dispatch = useDispatch();
  const pagination = useSelector((state) => state.pagination.pagination);
  const filters = useSelector((state) => state.todos.filters);
  const sort = useSelector((state) => state.todos.sort);
  const page = useSelector((state) => state.pagination.requestPage.page);
  let pagesBtns = [];
  for (let i = 1; i <= pagination.total_pages; i++) {
    pagesBtns.push(
      <PageButton onGetFilteredData={onGetFilteredData} pageNum={i} key={i} />
    );
  }

  function goToPreviewsPage() {
    if (pagination.prev_page > 0) {
      console.log("Going to previews page: " + pagination.prev_page);
      dispatch(updateRequestPage(pagination.prev_page));
      onGetFilteredData(filters, sort, pagination.prev_page);
    } else {
      console.log("No previews page found!");
    }
  }

  function goToNextPage() {
    if (pagination.next_page > 0) {
      console.log("Going to next page: " + pagination.next_page);
      dispatch(updateRequestPage(pagination.next_page));
      onGetFilteredData(filters, sort, pagination.next_page);
    } else {
      console.log("No next page found!");
    }
  }

  return (
    <div className="paginationControl">
      <div>
        <button onClick={goToPreviewsPage}>Left</button>
        {pagesBtns}
        <button onClick={goToNextPage}>Right</button>
      </div>
      <div className="paginationText">
        Total number of to do's: {pagination.total_records}
      </div>
      <div className="paginationText">
        Total number to do's after filters: {pagination.total_filtered}
      </div>
    </div>
  );
}
