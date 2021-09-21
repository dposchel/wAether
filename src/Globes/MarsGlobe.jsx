import * as React from 'react';
import Globe from 'react-globe.gl';

import marsImage from '../resources/surfaceMaps/2k_mars.jpeg'

import './Globes.css' 

const gData = [{lat:90,lng:135,size:1,color:'white'}]

export default function MarsGlobe() {
  return (
    <div className="Globe-container">
      <Globe
      globeImageUrl={marsImage}
      pointsData={gData}
      pointAltitude="size"
      pointColor="color"
      height="800"
      width="1095"
    />
    </div>
  );
}