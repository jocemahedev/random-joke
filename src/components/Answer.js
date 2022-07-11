import { Typography } from '@mui/material';
import React from 'react';

const Answer = (props) => {
return (
  <Typography variant="h6" gutterBottom component="div" color='primary'>
    {props.text}
  </Typography>
);
}

export default Answer;
