import React from "react";


export function NewToDoBtn({ toggleModal }){
    return(
      <button className='newToDoBtn generalBtn' onClick={toggleModal}>+ New To Do</button>
    );
  }
  