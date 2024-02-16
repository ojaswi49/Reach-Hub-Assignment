import React from 'react';
import './Board.css';

const Board = ({object,onClick,search}) => {

  return (
    <div className='board' onClick={onClick}>
        <div>Name of arena : {object.Event}</div>
        <div>Date : {object.Date} </div>
        <div>Opponent : {object.White === search?object.Black:object.White}  </div>
        <div>Result : {object.Result == "1-0"?"Won":"Loss"}</div>
        {/* <button className='details' onClick={() => func(object)}>Details</button> */}
    </div>
  )
}

export default Board;