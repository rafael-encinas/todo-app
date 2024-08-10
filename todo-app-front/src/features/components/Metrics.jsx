import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export function Metrics(){
    const metrics = useSelector((state)=> state.todos.metrics)
    return(
      <div className='metricsContainer'>
        <div>
          <div>Average time to finish tasks:</div>
          <div>{metrics.overallAverage} minutes</div>
        </div>
        <div>
          <div>Average time to finish tasks by priority:</div>
          <div>Low: <span>{metrics.lowPriorityAverage} minutes</span></div>
          <div>Medium: <span>{metrics.medPriorityAverage} minutes</span></div>
          <div>High: <span>{metrics.highPriorityAverage} minutes</span></div>
        </div>
      </div>
    )
  }