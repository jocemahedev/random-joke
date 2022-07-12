import React from "react";
import {Alert} from  "@mui/material";

const ErrorBlock = (props) => {
  return (
    <Alert variant="filled" severity="error">
      {props.text}
    </Alert>
  );
};
export default ErrorBlock;
