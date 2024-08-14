import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export function Metrics(){
    const metrics = useSelector((state)=> state.todos.metrics)
    return(
      <div className='metricsContainer'>
        <div>
          <div>Average time to finish tasks:</div>
          <div data-testid='allAvg-test'>{metrics.overallAverage} minutes</div>
        </div>
        <div>
          <div>Average time to finish tasks by priority:</div>
          <div>Low: <span data-testid='lowAvg-test'>{metrics.lowPriorityAverage} minutes</span></div>
          <div>Medium: <span data-testid='medAvg-test'>{metrics.medPriorityAverage} minutes</span></div>
          <div>High: <span data-testid='highAvg-test'>{metrics.highPriorityAverage} minutes</span></div>
        </div>
      </div>
    )
  }