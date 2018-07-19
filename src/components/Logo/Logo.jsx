import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import brain from './brain.png'
const Logo = (props) => (
    <div className="m4 mt0">
        <Tilt
            className="Tilt Logo"
            options={{
            max: 25
        }}
            style={{
            height: 150,
            width: 150
        }}>
            <div className="Tilt-inner">
                <img style={{paddingTop: '10px'}}src={brain} alt="logo"/>
            </div>
        </Tilt>
    </div>
);

export default Logo;