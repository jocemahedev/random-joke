import React from "react";
import {Button as ButtonMaterialUI}  from "@mui/material";

const Button = (props) => {

  return (
    <ButtonMaterialUI
      variant="contained"
      sx={{ mx:'auto', display: 'flex' }}
      onClick={props.onClickHandler}
    >
      {props.text}
    </ButtonMaterialUI>
  );
};
export default Button;
