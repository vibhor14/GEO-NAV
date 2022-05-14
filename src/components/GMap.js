import React, { useState,useRef } from 'react';
import { Loader } from "@googlemaps/js-api-loader";
import Score from './Score';
require('dotenv').config();
function GMaps(props){
    //l---------------------fuction for distance -------------------------------
    function deg2rad(deg) {
        return deg * (Math.PI / 180);
      }
    function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
        var R = 6371; 
        var dLat = deg2rad(lat2 - lat1); // deg2rad below
        var dLon = deg2rad(lon2 - lon1);
        var a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(deg2rad(lat1)) *
            Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        return(d);
      }
//==-------------------------------------------------------------------
    const [score,setScore] = useState(0);
    const [goPressed,setgoPressed] = useState(false);
    const gobutt = useRef(false);
    let points = useRef(0);
    let userGuess;
    let guessMarker; 
    let map;
    const loader = new Loader({
        apiKey: process.env.KEY,
        version: "weekly"
      });
      const mapOptions = {
        center: {
          lat: 0,
          lng: 0
        },
        zoom: 3,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false
      };
    loader.loadCallback(e => {
        if (e) {
          console.log(e);
        } else {
          //---------------Loading the map and populating DoM--------------------------------------------// 
          map= new window.google.maps.Map(document.getElementById("map"), mapOptions);
          
          //-------------------------Creating Map Marker-----------------------------------------
          var guessMarkerOptions = new window.google.maps.Marker({
            map: map,
            visible: true,
            title: 'Your guess',
            draggable: false
          });
          

          //-------------------------MAP click event handler--------------------------------------------
          map.addListener("click", (mapsMouseEvent) => {
              let position = mapsMouseEvent.latLng;
              userGuess =  position;
              //console.log(userGuess);
              setGuessMarker(userGuess);
            });
         //--------------------------Placing marker on CLICK--------------------------------------------
          function setGuessMarker(guess){
              if (guessMarker) {
                guessMarker.setPosition(guess);
                
              } else {
                guessMarker = new window.google.maps.Marker(guessMarkerOptions);
                guessMarker.setPosition(guess);
                
              }
              

            }
                      
//-----------------------------------------do not touch anything---------------------------//    
        }

      });
      let x;
      

      //=----------to place correct marker---------------//

      // function setCorrectMarker(){
        // if(goPressed){
        //   const flightPlanCoordinates = [
        //     { lat: props.lat, lng: props.lng },
        //     { lat: userGuess.lat(), lng: userGuess.lng() }
        //   ];
        //   const flightPath = new window.google.maps.Polyline({
        //     path: flightPlanCoordinates,
        //     geodesic: true,
        //     strokeColor: "#FF0000",
        //     strokeOpacity: 1.0,
        //     strokeWeight: 2,
        //   });
      //     // let correctMarker = new window.google.maps.Marker(props);
      //     // correctMarker.setPosition(props);
      //   }
      // }
      ///=======------------------------handle GO==---------------------------------------------
      function handleClick(event){
          const flightPlanCoordinates = [
            { lat: props.lat, lng: props.lng },
            { lat: userGuess.lat(), lng: userGuess.lng() }
          ];
          const flightPath = new window.google.maps.Polyline({
            path: flightPlanCoordinates,
            geodesic: true,
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 2,
          });
        setgoPressed(true);
        gobutt.current = true;
        
        x = getDistanceFromLatLonInKm(userGuess.lat(),userGuess.lng(),props.lat,props.lng);
        points.current=x;
        console.log(points);console.log(gobutt);
        setScore(x);
    }
    return (
        <div>
        <div id="map">
        
        </div>
        <button type="button" class="btn btn-success" onClick={handleClick}>GO</button>
        <a href="/play" className="resetbutton">Reset</a>
        {goPressed && <Score dist={score}/>}
        
        </div>
    );
}

export default GMaps;
