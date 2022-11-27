/****************************************************************************
  FileName      [ CurRow.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the CurRow. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import "./css/Row.css";
import React from 'react';


const CurRow = ({ curGuess, rowIdx }) => {
    let letters = curGuess.split('');
    for (let i = letters.length; i < 5; i++) {
        letters.push('');
    }
    return (
        <div className='Row-container'>
            {/* TODO 3: Row Implementation -- CurRow */}

            {/* ↓ Default row, you should modify it. ↓ */}
            <div className='Row-wrapper current'>
                {letters.map((c, idx) => {
                    return c === '' ? <div className='Row-wordbox' id={rowIdx.slice(-1) + '-' + idx} key={rowIdx.slice(-1) + '-' + idx}>{c}</div> : <div className='Row-wordbox filled' id={rowIdx.slice(-1) + '-' + idx} key={rowIdx.slice(-1) + '-' + idx}>{c}</div>
                })}
            </div>
            {/* ↑ Default row, you should modify it. ↑ */}
        </div>
    )
}

export default CurRow;
