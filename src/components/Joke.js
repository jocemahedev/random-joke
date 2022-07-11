import React from "react";
import { Typography } from "@mui/material";
const Joke = (props) => {
  return (
    <Typography variant="h6" gutterBottom component="div">
      {props.text}
    </Typography>
  );
};

export default Joke;
