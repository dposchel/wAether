import * as React from 'react';
import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Collapse } from '@mui/material';

export default function WeatherCard({ data }) {
  const [cardData, setCardData] = useState(data);
  useEffect(() => {
    setCardData(data);
  }, [data]);
  return (
    <Card sx={{ minWidth: 275 }} className="">
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="#FFFFFF" gutterBottom>
          {cardData?.coord?.lat?.toPrecision(4)},{cardData?.coord?.lon?.toPrecision(4)}
        </Typography>
        
          <Collapse in={cardData?.weather} orientation='vertical' timeout="auto" unmountOnExit>
            <Typography sx={{ fontSize: 14 }} color="#FFFFFF" gutterBottom>
              {cardData?.name || 'Uninhabited Land'}
            </Typography>
            <Typography variant="h5" component="div" color="#FFFFFF">
              {data?.weather ? data?.weather[0]?.main : null}
            </Typography>
            <Typography variant="h3" color="#FFFFFF">
              {data?.main?.temp?.toPrecision(3) + '°F'}
            </Typography>
            <Typography variant="h5" color="#FFFFFF">

            </Typography>
          </Collapse>
        
      </CardContent>

    </Card>
  );
}