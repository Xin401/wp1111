/****************************************************************************
  FileName      [ CurRow.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the CurRow. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import "./css/Row.css";
import React from 'react';


const CurRow = ({ curGuess, rowIdx, solution }) => {
    let letters =null
    if(curGuess)
    {
        letters=curGuess.split('')
        return (
            <div className='Row-container'>
                {/* TODO 3: Row Implementation -- CurRow */}
                
                {/* ↓ Default row, you should modify it. ↓ */}
                <div className='Row-wrapper current'>
                    {letters.map((l,index)=>{
                        if (l===curGuess.solution[0]||l===curGuess.solution[1]||l===curGuess.solution[2]||l===curGuess.solution[3]||l===curGuess.solution[4]&&l!==curGuess.solution[index]) {
                            return  <div key={rowIdx+'-'+index} id={rowIdx+'-'+index} className='Row-wordbox'>{l}</div>
                        }
                        else if(l===curGuess.solution[index])
                        {
                            return  <div key={rowIdx+'-'+index} id={rowIdx+'-'+index} className='Row-wordbox green'>{l}</div>
                        }
                        else
                        {
                            return  <div key={rowIdx+'-'+index} id={rowIdx+'-'+index} className='Row-wordbox grey'>{l}</div>
                        }
                })}
                </div>
                {/* ↑ Default row, you should modify it. ↑ */}
            </div>
        )
    }
    else
    {return (
        <div className='Row-container'>
            {/* TODO 3: Row Implementation -- Row */}
            
            {/* ↓ Default row, you should modify it. ↓ */}
            <div className='Row-wrapper'>
            <div className='Row-wordbox'></div>
            <div className='Row-wordbox'></div>
            <div className='Row-wordbox'></div>
            <div className='Row-wordbox'></div>
            <div className='Row-wordbox'></div>
            </div>
            {/* ↑ Default row, you should modify it. ↑ */}
        </div>
    )
    }
}

export default CurRow;
