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
    if (!guess) {
        guess = [{ char: '', color: '' }, { char: '', color: '' }, { char: '', color: '' }, { char: '', color: '' }, { char: '', color: '' }]
    }
    return (
        <div className='Row-container'>
            {/* TODO 3: Row Implementation -- Row */}

            {/* ↓ Default row, you should modify it. ↓ */}
            <div className='Row-wrapper'>
                {
                    guess.map((c, idx) => {
                        return <div className={'Row-wordbox ' + c.color} key={rowIdx.slice(-1) + '-' + idx} id={rowIdx.slice(-1) + '-' + idx}>{c.char}</div>
                    })
                }
            </div>
            {/* ↑ Default row, you should modify it. ↑ */}
        </div>
    )
}

export default Row;