import React, { Component } from 'react';
import { getCountryData } from '../fetch';
import '../css/App.sass';
import NavBar from './NavBar';
import Main from './Main';
import Loader from './Loader';

export class App extends Component {
    state = {
        data: {},
        country: '',
        fetch: false,
    };

    async componentDidMount() {
        const data = await getCountryData();
        this.setState({ data });
        if (this.state.data) {
            this.setState({ fetch: true });
        }
    }

    handleChange = async (country) => {
        const data = await getCountryData(country);
        this.setState({ data, country });
    };

    render() {
        return (
            <React.Fragment>
                {this.state.fetch ? (
                    <React.Fragment>
                        <NavBar handleChange={this.handleChange} />
                        <Main
                            data={this.state.data}
                            country={this.state.country}
                        />
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <NavBar handleChange={this.handleChange} />
                        <div className="error-container">
                            <Loader />
                        </div>
                    </React.Fragment>
                )}
            </React.Fragment>
        );
    }
}

export default App;
