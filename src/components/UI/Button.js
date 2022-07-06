import React from "react";

const Button = (props) => {

  return <button className="button" onClick={props.onClickHandler} >{props.text}</button>;
};
export default Button;
