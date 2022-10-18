/****************************************************************************
  FileName      [ Row.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Row. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import "./css/Row.css";
import React from 'react';


const Row = ({ guess, rowIdx }) => {
    let letters = null
    if(guess)
    {
        letters = guess.property.split('')
        return(<div className='Row-container'>
            {/* TODO 3: Row Implementation -- Row */}
            
            {/* ↓ Default row, you should modify it. ↓ */}
            <div className='Row-wrapper'>
            {letters.map((l,index)=>{
                if (l===guess.solution[0]||l===guess.solution[1]||l===guess.solution[2]||l===guess.solution[3]||l===guess.solution[4]&&l!==guess.solution[index]) {
                    return  <div key={rowIdx+'-'+index} id={rowIdx+'-'+index} className='Row-wordbox yellow'>{l}</div>
                }
                else if(l===guess.solution[index]) {
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

export default Row;