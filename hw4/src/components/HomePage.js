/****************************************************************************
  FileName      [ HomePage.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Home page.  ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import './css/HomePage.css';
import React, { useState, useEffect } from 'react';

const HomePage = ({ startGameOnClick, mineNumOnChange, boardSizeOnChange, mineNum, boardSize /* -- something more... -- */ }) => {
  const [showPanel, setShowPanel] = useState(false);      // A boolean variable. If true, the controlPanel will show.
  const [error, setError] = useState(false);              // A boolean variable. If true, means that the numbers of mines and the board size are invalid to build a game.
  const [mines, setMines] = useState(mineNum);
  const [bSize, setBSize] = useState(boardSize);
  const startGame = () => {
    startGameOnClick();
    mineNumOnChange(mines);
    boardSizeOnChange(bSize);
  }
  useEffect(() => {
    if (mines > bSize * bSize) {
      setError(true);
    }
    else {
      setError(false);
    }
  }, [mines, bSize])

  const show_hide = () => {
    setShowPanel(!showPanel);
  }

  const changeMine = (e) => {
    setMines(e.target.value);
  }
  const changeBSize = (e) => {
    setBSize(e.target.value);
  }
  return (
    <div className='HomeWrapper'>
      <p className='title'>MineSweeper</p>
      {/* Basic TODO:  Implemen start button */}
      <button className='btn' onClick={() => { startGame() }}>Start Game</button>
      <div className='controlContainer'>
        <button className='btn' onClick={() => { show_hide() }}>Difficulty Adjustment</button>
        <div className='controlWrapper' style={showPanel ? { display: 'block' } : { display: 'none' }}>
          <div className='error' style={error ? { display: 'block' } : { display: 'none' }}>
            <p style={error ? { color: '#880000', display: 'inline' } : { display: 'none' }}>ERROR: Mines number and board size are invalid!</p>
          </div>
          <div className='controlPanel'>
            <div className='controlCol'>
              <p className='controlTitle'>Mines Number</p>
              <input type={'range'} step={1} min={0} max={100} defaultValue={mines} onChange={changeMine} />
              <p className='controlNum' style={error ? { color: '#880000' } : {}}>{mines}</p>
            </div>
            <div className='controlCol'>
              <p className='controlTitle'>Board Size(n*n)</p>
              <input type={'range'} step={1} min={1} max={10} defaultValue={bSize} onChange={changeBSize} />
              <p className='controlNum' style={error ? { color: '#880000' } : {}}>{bSize}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Advanced TODO: Implementation of Difficult Adjustment
                Useful Hint: <input type = 'range' min = '...' max = '...' defaultValue = '...'> 
                Useful Hint: Error color: '#880000', default text color: '#0f0f4b', invisible color: 'transparent' 
                Reminder: The defaultValue of 'mineNum' is 10, and the defaultValue of 'boardSize' is 8. */}

    </div >
  );

}
export default HomePage;   