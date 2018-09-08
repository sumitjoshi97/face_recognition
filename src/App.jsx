import React, {Component} from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

const particlesOptions = {
    particles: {
        number: {
            value: 30,
            density: {
                enable: true,
                value_area: 800
            }
        }
    }
}

const initialState = {
        input: '',
        imageUrl: '',
        boxes: [],
        route: 'signin',
        isSignedIn: false,
        user: {
            id: '',
            name: '',
            email: '',
            entries: '',
            joined: ''
        }
    }

class App extends Component {
    state = initialState

    loadUser = (user) => {
        this.setState({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                entries: user.entries,
                joined: user.joined
            }
        })
    }

    onButtonSubmit = () => {
        this.setState({imageUrl: this.state.input})
        fetch('https://face-recog-api97.herokuapp.com/imageUrl', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                input: this.state.input
            })
        })  
            .then(response => response.json())
            .then(response => {
                if (response) {
                    fetch('https://face-recog-api97.herokuapp.com/image', {
                        method: 'put',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            id: this.state.user.id
                        })
                    })
                        .then(response => response.json())
                        .then(count => {
                            this.setState(Object.assign(this.state.user, { entries: count }))
                        })
                        .catch(console.log)

                }
                this.displayFaceBox(this.calculateFacesLocation(response))
            })
            .catch(err => console.log(err));
    }

    calculateFacesLocation = data => {
        return data.outputs[0].data.regions.map(face => {
            const clarifaiFace = face.region_info.bounding_box
            const image = document.getElementById('inputImage');
            const width = Number(image.width);
            const height = Number(image.height);
            return {
                leftCol: clarifaiFace.left_col * width,
                topRow: clarifaiFace.top_row * height,
                rightCol: width - (clarifaiFace.right_col * width),
                bottomRow: height - (clarifaiFace.bottom_row * height)
            }
        });
    }

    displayFaceBox = boxes => {
        this.setState({ boxes })
    }

    onRouteChange = route => {
        if (route === 'signin' || route === 'register') {
            this.setState(initialState)
        } else if (route === 'home') {
            this.setState({ isSignedIn: true })
        }
        this.setState({
            route: route
        })
    }

    onInputChange = event => {
        this.setState({
            input: event.target.value
        })
    }

    render() {
        const { imageUrl, boxes, route, isSignedIn } = this.state;

        return (
            <div className="App">
                <Particles className="particles"
                    params={particlesOptions}
                />
                <Navigation 
                    onRouteChange={this.onRouteChange}
                    isSignedIn={isSignedIn}/>
                { route === 'home' ?
                    <div>
                        <Rank 
                            name={this.state.user.name} 
                            entries={this.state.user.entries} />
                        <ImageLinkForm
                            onInputChange={this.onInputChange}
                            onButtonSubmit={this.onButtonSubmit}
                        />
                        <FaceRecognition ImageUrl={imageUrl} boxes={boxes} />
                    </div> :
                    ( route === 'signin' ? 
                        <SignIn 
                            onRouteChange={this.onRouteChange}
                            loadUser={this.loadUser} /> : 
                        <Register 
                            loadUser={this.loadUser} 
                            onRouteChange={this.onRouteChange} /> 
                    )
                }
            </div>
        );
    }
}

export default App;