import React, { Component } from 'react'

export class Register extends Component {
    
    state = {
        registerName: '',
        registerEmail: '',
        registerPassword: ''
    }

    onNameChange = (event) => {
        this.setState({signInName: event.target.value})
    }

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }

    onSubmitRegister = () => {
        console.log(this.state);
        fetch('http://localhost:5000/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.registerName,
                email: this.state.registerEmail,
                password: this.state.registerPassword
            })
        }).then(response => console.log(response.json()))
        .catch
        console.log('post send')
        this.props.onRouteChange('home');
    }
  
    render() {
    return (
        <article class="br3 ba dark-grey b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
        <main className="pa4 black-80 ">
            <form className="measure">
                <fieldset id="register" className="ba b--transparent ph0 mh0">
                    <legend className="f4 fw6 ph0 mh0">Register</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                        <input
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                            type="text"
                            name="name"
                            id="name"
                            onChange={this.onNameChange}
                            />
                    </div>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                            type="email"
                            name="email-address"
                            id="email-address"
                            onChange={this.onEmailChange}
                            />
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input
                            className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                            type="password"
                            name="password"
                            id="password"
                            onChange={this.onPasswordChange}
                            />
                    </div>
                </fieldset>
                <div className="">
                    <input
                    onClick={() => onRouteChange('home')}
                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                    type="submit"
                    value="Sign in"/>
                </div>
                <div className="lh-copy mt3">
                    <p onClick={() => onRouteChange('signin')} className="f6 link dim black db">Sign In</p>
                </div>
            </form>
        </main>
    </article>
    )
  }
}

export default Register;