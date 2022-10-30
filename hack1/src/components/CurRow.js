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
    let letters = curGuess.split('');
    return (
        <div className='Row-container'>
            {/* TODO 3: Row Implementation -- CurRow */}
            
            <div className='Row-wrapper current'>
                {letters.map((l,index)=>{
                    return(<div className='Row-wordbox'>{l}</div>) 
                })
                }
            </div>
        </div>
    )
}

export default CurRow;