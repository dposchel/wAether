import * as React from 'react';
import Globe from 'react-globe.gl';
import moonImage from '../resources/surfaceMaps/lunar_surface.jpg'
import moonBumpMap from '../resources/surfaceMaps/lunar_bumpmap.jpg'

import './Globes.css' 

const N = 0;
let gData = [...Array(N).keys()].map(() => ({
  lat: (Math.random() - 0.5) * 180,
  lng: (Math.random() - 0.5) * 360,
  size: Math.random() / 3,
  color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]
}));

export default function MoonGlobe() {

  gData.push({lat:90,lng:135,size:1,color:'white'})
  return (
    <div className="Globe-container">
      <Globe
      globeImageUrl={moonImage}
      bumpImageUrl={moonBumpMap}
      pointsData={gData}
      pointAltitude="size"
      pointColor="color"
      height="800"
      width="1095"
    />
    </div>
  );
}