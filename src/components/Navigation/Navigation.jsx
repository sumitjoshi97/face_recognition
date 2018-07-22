import React from 'react';
import Logo from '../Logo/Logo';

const Navigation = ({onRouteChange, isSignedIn}) => {
    if (isSignedIn) {
        return (
            <nav
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '30px'
                }}>
                <Logo/>
                <div>
                    <p
                        onClick={() => onRouteChange('signin')}
                        className="f3 link dim black underline pa3 pointer">Sign out</p>
                </div>
                
            </nav>)
    } else {
        return (
            <nav
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    padding: '30px'
                }}>
                <p
                    onClick={() => onRouteChange('signin')}
                    className="f3 link dim black underline pa3 pointer">Sign in</p>
                <p
                    onClick={() => onRouteChange('register')}
                    className="f3 link dim black underline pa3 pointer">Register</p>
            </nav>

    )}
};

export default Navigation;