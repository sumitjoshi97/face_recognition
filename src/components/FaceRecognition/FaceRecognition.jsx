import React from 'react'
import './FaceRecognition.css';

const FaceRecognition = ({ImageUrl, box}) => (
  <div className="center ma">
    <div className="absolute mt2">
      <img src={ImageUrl} alt="input" width='500px' height='auto' id='inputImage'/>
      <div className="bounding-box" style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
    </div>
  </div>
)

export default FaceRecognition;