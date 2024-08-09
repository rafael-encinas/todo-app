import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export function Metrics({ metrics }){
    const searchText = useSelector((state)=> state.searchText.testing)
    return(
      <div className='metricsContainer'>
        <div>
          <div>Average time to finish tasks:</div>
          <div>22:15 minutes{/* Should be replaced by a variable from 'metrics' */}</div>
        </div>
        <div>
          <div>Average time to finish tasks by priority:</div>
          <div>Low: <span>{searchText}</span></div>
          <div>Medium: <span>10:25 minutes</span></div>
          <div>High: <span>10:25 minutes</span></div>
        </div>
      </div>
    )
  }