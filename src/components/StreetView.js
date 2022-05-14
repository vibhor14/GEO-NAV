import React from 'react';
import { Loader } from "@googlemaps/js-api-loader";
require('dotenv').config();

function StreetView(props){
    const loader = new Loader({
        apiKey: process.env.KEY,
        version: "weekly"
      });
      const location = {
          lat: props.lat,
          lng: props.lng
      }
      loader.loadCallback(e => {
        if (e) {  
          console.log(e);
        } else{
            // eslint-disable-next-line no-unused-vars
            const panorama = new window.google.maps.StreetViewPanorama(
                document.getElementById("pano"),
                {
                  position: location,
                  pov: {
                    heading: 34,
                    pitch: 10,
                  },
                  addressControl: false,
                  linksControl: false,
                  showRoadLabels: false,
                  fullscreenControl: false,
                }
              );
        }
});
    return (
        <div id="pano">
        
        </div>
    );
}

export default StreetView;