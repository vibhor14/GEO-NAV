import React from 'react';
import Home from './Home';
import GameScreen from './GameScreen';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
function App() {

  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
      <Route path="play" element={<GameScreen className="gamescreen"/>} /> 
      <Route path="/" element= {<Home className="home"/>} />
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
