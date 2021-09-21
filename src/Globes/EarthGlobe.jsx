import * as React from 'react';
import { useState, useEffect } from 'react';
import Globe from 'react-globe.gl';
import * as THREE from 'three'

import WeatherCard from '../WeatherCard/WeatherCard'

import './Globes.css' 

const TILE_MARGIN = 0.00; // degrees
const API_KEY = 'beb7150490945ad8e8581ddc73e6a064';

// Gen random data
const GRID_SIZE = [200, 100];

const redMaterial = new THREE.MeshLambertMaterial({ color:'red', opacity: 0.5, transparent: true });
const noMaterial = new THREE.MeshLambertMaterial({ color:'red', opacity: 0.0, transparent: true });

const tileWidth = 360 / GRID_SIZE[0];
const tileHeight = 180 / GRID_SIZE[1];
const tilesData = [];
[...Array(GRID_SIZE[0]).keys()].forEach(lngIdx =>
  [...Array(GRID_SIZE[1]).keys()].forEach(latIdx =>
    tilesData.push({
      lng: -180 + lngIdx * tileWidth,
      lat: -90 + (latIdx + 0.5) * tileHeight,
      material: '#555555'
    })
  )
);

export default function EarthGlobe() {
  const [tiles, setTiles] = useState(tilesData);
  const [previousTile, setPreviousTile] = useState();
  const [weatherDisplayData, setWeatherDisplayData] = useState({
    coord: {
      lon: -122.08,
      lat: 37.39
    },
  });
  const [weatherDataLoading, setWeatherDataLoading] = useState(false);

  function onHoverRegion(selectedTile) {
    if (selectedTile) {
      if((previousTile?.lat !== selectedTile?.lat || previousTile?.lng !== selectedTile?.lng)){
        setTiles(tiles.map(t => {
          if(t?.lat === selectedTile.lat && t?.lng === selectedTile.lng ) {
            return {...t,material: redMaterial};
          }
          if(t?.lat === previousTile?.lat && t?.lng === previousTile?.lng ) {
            return {...t,material: noMaterial};
          }
          return t;
        }));
        setPreviousTile(selectedTile);
        setWeatherDisplayData({...weatherDisplayData,coord:{lat:selectedTile.lat,lon:selectedTile.lng}});
      }
    }
  }

  function onClickRegion(selectedTile) {
    if (selectedTile) {
      setWeatherDataLoading(true);
      fetchRegionData({lat:selectedTile.lat,lng:selectedTile.lng});
      console.log(weatherDisplayData);
    }
  }

  function fetchRegionData(locationData) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${locationData.lat}&lon=${locationData.lng}&appid=${API_KEY}`)
      .then(res => res.json())
      .then(
        (result) => {
          setWeatherDisplayData(result);
          setWeatherDataLoading(false);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
        }
      );
    return ({
      lat:locationData.lat,
      lng:locationData.lng,

    });
  }

  let gData = [{lat:90,lng:135,size:1,color:'white'}];
  return (
    <div className="Globe-container">
      <Globe
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
      bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
      pointsData={gData}
      pointAltitude="size"
      pointColor="color"
      height="800"
      width="1095"
      tileMaterial="material"
      tilesData={tiles}
      tileWidth={tileWidth - TILE_MARGIN}
      tileHeight={tileHeight - TILE_MARGIN}
      onTileHover={(t) => onHoverRegion(t)}
      onTileClick={(t) => onClickRegion(t)}
    >
    </Globe>
    <div className="Globe-weather-popup">
      <WeatherCard data={weatherDisplayData}/>
    </div>
    </div>
  );
}