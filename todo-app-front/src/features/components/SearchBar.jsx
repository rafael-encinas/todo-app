import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export function SearchBar(){

    return(
      <form className='searchBar'>
        <div>
          <label >Name: </label>
          <input type="text" placeholder='Text' />
        </div>
        <div>
          <label >Priority: </label>
          <select name="" id="">
            <option value="">All, High, Medium, Low</option>
            <option value="">High</option>
            <option value="">Medium</option>
            <option value="">Low</option>
          </select>
        </div>
        <div>
          <label >State: </label>
          <select name="" id="">
            <option value="">All, Done, Undone</option>
            <option value="">Done</option>
            <option value="">Undone</option>
          </select>
        </div>
        <button className='searchBtn generalBtn' onClick={(e)=>{e.preventDefault()}}>Search</button>
      </form>
    );
  }