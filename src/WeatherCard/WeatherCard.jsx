import * as React from 'react';
import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export default function WeatherCard({data}) {
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
      <Typography variant="h5" component="div" color="#FFFFFF">
        
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="#FFFFFF">
        
      </Typography>
      <Typography variant="body2" color="#FFFFFF">

      </Typography>
    </CardContent>

    </Card>
  );
}