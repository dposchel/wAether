import * as React from 'react';
import { useState } from 'react';
import Globe from 'react-globe.gl';
import * as THREE from 'three'

import WeatherCard from '../WeatherCard/WeatherCard'

import moonImage from '../resources/surfaceMaps/lunar_surface.jpg'
import moonBumpMap from '../resources/surfaceMaps/lunar_bumpmap.jpg'

import './Globes.css'

const TILE_MARGIN = 0.00; // degrees
const API_KEY = 'beb7150490945ad8e8581ddc73e6a064';

// Gen random data
const GRID_SIZE = [20, 10];

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

export default function MoonGlobe() {
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
    const randomTemp = 224+(Math.random()-.5)*15;
    setWeatherDisplayData({
      coord: {
        lat:locationData.lat,
        lon:locationData.lng
      },
      weather: [
        {
          id: 800,
          main: "Clear",
          description: "No Atmosphere",
          icon: "01d"
        }
      ],
      base: "stations",
      main: {
        temp: randomTemp,
        feels_like: randomTemp+Math.random()*4,
        temp_min: randomTemp-Math.random()*8,
        temp_max: randomTemp+Math.random()*8,
        pressure: 0,
        humidity: 0
      },
      visibility: 9999,
      wind: {
        speed: 0,
        deg: 0
      },
      clouds: {
        all: 0
      },
      dt: 1560350645,
      sys: {
        type: 1,
        id: 5122,
        message: 0.0139,
        country: "N/A",
        sunrise: 1560343627,
        sunset: 1560396563
      },
      timezone: 0,
      id: 0,
      name: "Lunar Surface",
      cod: 200
    });
    return ({
      lat:locationData.lat,
      lng:locationData.lng,
    });
  }

  return (
    <div className="Globe-container">
      <Globe
      globeImageUrl={moonImage}
      bumpImageUrl={moonBumpMap}
      height={800}
      width={1095}
      tileMaterial="material"
      tilesData={tiles}
      tileWidth={tileWidth - TILE_MARGIN}
      tileHeight={tileHeight - TILE_MARGIN}
      onTileHover={(t) => onHoverRegion(t)}
      onTileClick={(t) => onClickRegion(t)}
    />
    <div className="Globe-weather-popup">
      <WeatherCard data={weatherDisplayData}/>
    </div>
    </div>
  );
}