import React, { useState, useEffect, useRef } from 'react';
import { Button, List, ListItem, Box, Typography } from '@mui/material';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


const Timer = () => {
  const [milliseconds, setMilliseconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const countRef = useRef(null);
  const [recordedTimes, setRecordedTimes] = useState([]);

  const start = () => {
    setIsActive(true);
    countRef.current = setInterval(() => {
      setMilliseconds((milliseconds) => milliseconds + 10);
    }, 10);
  };

  const recordTime = () => {
    setRecordedTimes(prevTimes => {
      if (prevTimes.length < 10) {
        return [milliseconds, ...prevTimes];  // change order of recorded times
      } else {
        return [milliseconds, ...prevTimes.slice(0, prevTimes.length - 1)];  // change order of recorded times
      }
    });
  };

  const stop = () => {
    setIsActive(false);
    clearInterval(countRef.current);
    recordTime();
  };

  const reset = () => {
    setIsActive(false);
    clearInterval(countRef.current);
    if (milliseconds > 0) {
      recordTime();
    }
    setMilliseconds(0);
  };

  useEffect(() => {
    return () => clearInterval(countRef.current);
  }, []);

  return (
    <Box sx={{p: 2}}>
      <Typography variant="h2" gutterBottom>{(milliseconds / 1000).toFixed(2)}秒</Typography>
      <Box>
      <Button onClick={start} disabled={isActive} variant="contained" startIcon={<PlayCircleFilledWhiteIcon />}></Button>
      <Button onClick={stop} disabled={!isActive} variant="contained" startIcon={<StopCircleIcon />}></Button>
      <Button onClick={reset} disabled={milliseconds === 0} variant="contained" startIcon={<RestartAltIcon />}></Button>
      </Box >
      <List>
      {recordedTimes.map((time, index) => (
        <ListItem key={index}><Typography variant="h5">{(time / 1000).toFixed(2)}秒</Typography></ListItem>
      ))}
      </List>
    </Box>
  );
}

export default Timer;
