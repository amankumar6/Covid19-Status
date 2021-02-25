import React, { Component } from 'react';
import { Spinner } from 'react-bootstrap';

export class Loader extends Component {
    render() {
        return (
            <React.Fragment>
                <p className="loading">{this.props.title || '𝐹𝑒𝓉𝒸𝒽𝒾𝓃𝑔 𝒟𝒶𝓉𝒶'}</p>
                <Spinner animation="border" variant="primary" />
            </React.Fragment>
        );
    }
}

export default Loader;
