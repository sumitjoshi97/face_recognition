import React, {Component} from 'react'
import './ImageLinkForm.css';
export default class ImageLinkForm extends Component {
    render() {
        return (
            <div>
                <p className="f3">
                    {`This Magic Brain will detect faces in your pictures.`}
                </p>
                <div className="center">
                    <div className="form w-40 pa4 br3 shadow-5 center">
                        <input
                            type="text"
                            className="f4 pa2 w-70 center"
                            onChange={(e) => this.props.onInputChange(e)}
                            placeholder="Paste you link here.."/>
                        <button
                            className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple center"
                            onClick={this.props.onButtonSubmit}>
                            Detect
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}