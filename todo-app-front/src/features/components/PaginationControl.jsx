import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PageButton } from "./PageButton";
import { updateRequestPage } from "../pagination/paginationSlice";

export function PaginationControl({getNewData}){
    const dispatch = useDispatch();
    const pagination = useSelector((state)=> state.pagination.pagination)
    //console.log(pagination);
    //for(pagination.total_pages) to create all the pages buttons
    let pagesBtns = [];
    for(let i=1; i<=pagination.total_pages; i++){
        pagesBtns.push(
            <PageButton getNewData={getNewData} pageNum={i} key={i} />
        )
    }

    function goToPreviewsPage(){
        if(pagination.prev_page>0){
            console.log("Going to previews page: " + pagination.prev_page)
            dispatch(updateRequestPage(pagination.prev_page));
            //Get request here!
            getNewData();
        } else{
            console.log("No previews page found!");
        }
    }

    function goToNextPage(){
        if(pagination.next_page>0){
            console.log("Going to next page: "+pagination.next_page)
            dispatch(updateRequestPage(pagination.next_page));
            //Get request here!
            getNewData();
        } else{
            console.log("No next page found!");
        }
    }

    return(
     <div className='paginationControl'>
         <div >
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
    )
  }