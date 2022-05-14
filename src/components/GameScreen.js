import React from "react";
import StreetView from "./StreetView";
import GMaps from "./GMap";
import Locations from '../locations/locations.json';

function GameScreen(){
    let randIndex = Math.floor(Math.random() * Locations.lat.length);
    let latitude = Locations.lat[randIndex];
    let longitude = Locations.lng[randIndex];
    return(
    <div>
        <ul class="nav">
            <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/">Home</a>
            </li>
            <li class="nav-item">
            <a class="nav-link" href="/">How to play</a>
            </li>
            <li class="nav-item">
            <a class="nav-link" href="/">Contact</a>
            </li>
        </ul>
        <div className="game">
        <StreetView lat={latitude} lng={longitude} />
        <GMaps lat={latitude} lng={longitude}/>
        </div>
    </div>
    );
}

export default GameScreen;