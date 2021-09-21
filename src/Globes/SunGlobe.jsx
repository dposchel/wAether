import * as React from 'react';
import { useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';
import Typography from '@mui/material/Typography';

import sunImage from '../resources/surfaceMaps/2k_sun.jpeg'

import './Globes.css' 

const gData = [{lat:90,lng:135,size:1,color:'white'}]

export default function SunGlobe() {
  const globeEl = useRef();
  
  useEffect(() => {
    // Auto-rotate
    globeEl.current.controls().autoRotate = true;
    globeEl.current.controls().autoRotateSpeed = 0.3;
    globeEl.current.pointOfView({ altitude: 4 }, 5000);
  }, []);
  return (
    <div className="Globe-container">
      <Globe
      ref={globeEl}
      globeImageUrl={sunImage}
      pointsData={gData}
      pointAltitude="size"
      pointColor="color"
      height={800}
      width={1095}
    />
    <div className="Globe-no-data-popup">
        <Typography variant="h5" component="div" color="#FFFFFF" className="Globe-no-data-popup-text">
          No Data
        </Typography>
      </div>
    </div>
  );
}