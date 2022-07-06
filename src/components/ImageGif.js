import React from 'react';
import drole1 from '../assets/drole1.gif'
import drole2 from '../assets/drole2.gif'
import drole3 from '../assets/drole3.gif'
import choc1 from '../assets/choc1.gif'

function RandArray(array) {
  var rand = (Math.random() * array.length) | 0;
  var rValue = array[rand];
  return rValue;
}
const myArray = [drole1, drole2, drole3];

const ImageGif = (props) => {
let imageChoosen;
switch (props.type) {
  case "dark":
  case "limit":
  imageChoosen = choc1;
    break;

  default:
  imageChoosen = RandArray(myArray);
    break;
}
return <img alt="rigolus" className="gif" src={imageChoosen} height="150px" width="150px"/>

}
export default ImageGif;
