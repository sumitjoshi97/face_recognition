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


const app = new Clarifai.App({
 apiKey: 'b9556e1bfe254ee48ce105137f50604c'
});

class App extends Component {

    state = {
        input: '',
        imageUrl: '',
        box:'',
        route: '',
        isSignedIn: false,
    }

    onInputChange = (event) => {
        this.setState({
            input: event.target.value
        })
    }

    onButtonSubmit = () => {
        this.setState((prevState) =>({imageUrl: prevState.input}))
        app.models.predict(
            Clarifai.FACE_DETECT_MODEL, 
            this.state.input)
            .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
            .catch(err => console.log(err))
        
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
            this.setState({isSignedIn: false})
        } else if(route === 'home') {
            this.setState({isSignedIn: true})
        }
        this.setState({
            route: route
        })
    }

    render() {
        const {imageUrl, box, route, isSignedIn} = this.state;

        return (
            <div className="App">
                <Particles className="particles"
                    params={particlesOptions}
                />
                <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
               { route ==='home' ?  
                    <div>
                        <Logo />
                        <Rank />
                        <ImageLinkForm
                            onInputChange={this.onInputChange}
                            onButtonSubmit={this.onButtonSubmit}
                        />
                        <FaceRecognition ImageUrl={imageUrl} box={box} />
                    </div> :
                    ( route === 'register' ? <Register onRouteChange={this.onRouteChange}/> : <SignIn onRouteChange={this.onRouteChange}/> )
                    
                }
            </div>
        );
    }
}

export default App;