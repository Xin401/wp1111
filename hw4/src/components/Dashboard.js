/****************************************************************************
  FileName      [ Dashnoard.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Dashboard. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import React, { useEffect, useState } from 'react';
import "./css/Dashboard.css"

export default function Dashboard({ remainFlagNum, gameOver, win }) {
  let [time, setTime] = useState(0);
  let [sTime, setSTime] = useState(0);


  useEffect(() => {
    if (!gameOver && !win) {
      const interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
    else {
      setSTime(time);
      setTime(0);
    }
  }, [win, gameOver]);

  useEffect(() => {

  }, []);


  return (
    <div className="dashBoard" >
      <div id='dashBoard_col1' >
        <div className='dashBoard_col'>
          <p className='icon'>🚩</p>
          {remainFlagNum}
        </div>
      </div>
      <div id='dashBoard_col2' >
        <div className='dashBoard_col'>
          <p className='icon'>⏰</p>
          {gameOver || win ? sTime : time}
        </div>
      </div>
    </div>
  );
}
