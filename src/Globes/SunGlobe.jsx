import * as React from 'react';
import Globe from 'react-globe.gl';

import sunImage from '../resources/surfaceMaps/2k_sun.jpeg'

import './Globes.css' 

const gData = [{lat:90,lng:135,size:1,color:'white'}]

export default function SunGlobe() {
  return (
    <div className="Globe-container">
      <Globe
      globeImageUrl={sunImage}
      pointsData={gData}
      pointAltitude="size"
      pointColor="color"
      height="800"
      width="1095"
    />
    <div className="Globe-weather-popup">
      test
    </div>
    </div>
  );
}