import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export function NewToDoBtn({ toggleModal }){
    return(
      <button className='newToDoBtn generalBtn' onClick={toggleModal}>+ New To Do</button>
    );
  }
  