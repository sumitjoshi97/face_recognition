import React from 'react'
import './FaceRecognition.css';

const FaceRecognition = ({ImageUrl, boxes}) => (
  <div className="center ma">
    <div className="absolute mt2">
      <img src={ImageUrl} alt="input" width='500px' height='auto' id='inputImage'/>
      {
        boxes.map(box=> {
          return <div 
            className="bounding-box" 
            key={box.topRow} 
            style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}>
            </div>
        })
      }
      
    </div>
  </div>
)

export default FaceRecognition;