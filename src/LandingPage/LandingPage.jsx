import { useState, useEffect } from 'react';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { CardActionArea } from '@mui/material';
import { Collapse } from '@mui/material';

import TopNavBar from "./TopNavBar";
import EarthGlobe from "../Globes/EarthGlobe";
import MoonGlobe from "../Globes/MoonGlobe";
import earthImage from '../resources/earth_blue_planet_globe.jpg';
import moonImage from '../resources/moon-test.png';
import sunImage from '../resources/sun_immage.jpeg';
import marsImage from '../resources/mars_red_planet_planet.jpg'

import './LandingPage.css'

export default function LandingPage() {
  const [activeCard, setActiveCard] = useState(-1);
  function openCard(cardChoice) {
    if (cardChoice === activeCard) {
      setActiveCard(-1);
      return;
    }
    setActiveCard(cardChoice);
  }
  function gridNumber(planetCardNumber) {
    if (activeCard === -1)
      return 3;
    if (activeCard === planetCardNumber)
      return 9;
    return 1;
  }
  return (
    <div className="App">
      <TopNavBar />
      <Grid className="CardStack" container spacing={0}>
        <Grid item xs={6} md={gridNumber(0)} style={{display:'flex'}}>
          <PlanetCard planetName="Sun" image={sunImage} openCard={()=>openCard(0)} active={activeCard===0}/>
          <Collapse in={activeCard===0} orientation='horizontal' timeout="auto" unmountOnExit>
            <EarthGlobe />
          </Collapse>
        </Grid>
        <Grid item xs={6} md={gridNumber(1)} style={{display:'flex'}}>
          <PlanetCard planetName="Earth" image={earthImage} openCard={()=>openCard(1)} active={activeCard===1}/>
          <Collapse in={activeCard===1} orientation='horizontal' timeout="auto" unmountOnExit>
            <EarthGlobe />
          </Collapse>
        </Grid>
        <Grid item xs={6} md={gridNumber(2)} style={{display:'flex'}}>
          <PlanetCard planetName="Moon" image={moonImage} openCard={()=>openCard(2)} active={activeCard===2}/>
          <Collapse in={activeCard===2} orientation='horizontal' timeout="auto" unmountOnExit>
            <MoonGlobe />
          </Collapse>
        </Grid>
        <Grid item xs={6} md={gridNumber(3)} style={{display:'flex'}}>
          <PlanetCard planetName="Mars" image={marsImage} openCard={()=>openCard(3)} active={activeCard===3}/>
          <Collapse in={activeCard===3} orientation='horizontal' timeout="auto" unmountOnExit>
            <EarthGlobe />
          </Collapse>
        </Grid>
      </Grid>
    </div>
  );
}

function PlanetCard(props) {
  const { height } = useWindowDimensions();
  return (
    <>
    <Paper elevation={6}>
      <Card sx={{ maxWidth: props.active ? 90 : 440 }} className="PlanetCard">
        <CardActionArea onClick={props.openCard}>
          <CardMedia
            component="img"
            height={height-155}
            image={props.image}
            alt={`${props.planetName} Image Failed to Load`}
          />
          <CardContent className="PlanetCard-card-content">
            <Typography gutterBottom variant="h5" component="div" className="PlanetCard-card-content">
              {props.planetName}
            </Typography>
          </CardContent>
        </CardActionArea>
        
      </Card>
    </Paper>
    </>
  );
};


function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}