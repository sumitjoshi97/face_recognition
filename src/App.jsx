import React, {Component} from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';


const app = new Clarifai.App({
    apiKey: 'b9556e1bfe254ee48ce105137f50604c'
});


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
        box: {},
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
        app.models
            .predict(
                Clarifai.FACE_DETECT_MODEL, 
                this.state.input)
                
            .then(response => {
                if (response) {
                    fetch('http://localhost:5000/image', {
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
                this.displayFaceBox(this.calculateFaceLocation(response))
            })
            .catch(err => console.log(err));
    }
        

    calculateFaceLocation = (data) => {
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputImage');
        const width = Number(image.width);
        const height = Number(image.height);
        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height)
        }
    }

    displayFaceBox = box => {
        this.setState({
            box: box
        })
    }

    onRouteChange = (route) => {
        if (route === 'signin' || route === 'register') {
            this.setState(initialState)
        } else if(route === 'home') {
            this.setState({isSignedIn: true})
        }
        this.setState({
            route: route
        })
    }

    onInputChange = (event) => {
        this.setState({
            input: event.target.value
        })
    }

    render() {
        const { imageUrl, box, route, isSignedIn } = this.state;

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
                        <Logo />
                        <Rank 
                            name={this.state.user.name} 
                            entries={this.state.user.entries} />
                        <ImageLinkForm
                            onInputChange={this.onInputChange}
                            onButtonSubmit={this.onButtonSubmit}
                        />
                        <FaceRecognition ImageUrl={imageUrl} box={box} />
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