import React, { useState } from "react";

export function EmptyData() {
  return (
    <div className="noDataContainer">
      Couldn't find any todos, please change filters or create a new To Do!
    </div>
  );
}
