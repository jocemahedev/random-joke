import React from "react";


const Loading = (props) => {
  return (
    <div className="dotwrapper">
      {props.text}
      <div className="dot0" />
      <div className="dot1" />
      <div className="dot2" />
    </div>
  );
};
export default Loading;
