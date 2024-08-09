import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appendText, modifyTime } from "./searchTextSlice";

export function SearchText(){
    const searchText = useSelector((state)=> state.searchText.value)
    const dispatch = useDispatch();
    const [appendable, setAppendable] = useState(null);
    return(
        <div>
            <form className='searchBar'>
                <div>
                <label >Name: </label>
                <input type="text" placeholder='Text'
                onChange={e=> setAppendable(e.target.value)} />
                </div>
                <button className='searchBtn generalBtn' onClick={(e)=>{
                    e.preventDefault()
                    dispatch(appendText(appendable || ""))
                    dispatch(modifyTime())
                    }}>
                    Search
                </button>
            </form>
            <div>{searchText}</div>
        </div>
    )
}