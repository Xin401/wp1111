/****************************************************************************
  FileName      [ Board.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Board. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import Row from "./Row";
import './css/Board.css';
import React from "react";
import CurRow from "./CurRow";

const Board = ({ turn, guesses, curGuess,solution }) => {
    return (
        <div className="Board-container">
            {/* TODO 2-2: show 6 rows (map function is recommended) and defined row's key.
                Hint: Use `CurRow` instead of `Row` when you are passing `curGuess` into it. */}
                
        {guesses.map((g,index)=>{
            if(turn===index)
            {
                return(
                <CurRow key={'row'+index} id={'row'+index} curGuess={curGuess} rowIdx={index} solution={solution}/>
            )}
            else
            {return(
                <Row key={'row'+index} id={'row'+index} guess={g} rowIdx={index}/>
            )}
        })}
        </div>
    )
};
export default Board;
