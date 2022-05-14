import React from 'react';
import {Link} from 'react-router-dom';

function Home() {
  return (
    <div className="home">
        <h1>Welcome !</h1>
        <Link to="play"><button type="button" class="btn btn-primary">Start Game</button></Link>
    </div>
  );
}

export default Home;