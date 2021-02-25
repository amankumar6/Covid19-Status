import React, { Component } from 'react';
import Cards from './Cards';
import Graph from './Graph';
import { Row, Col } from 'react-bootstrap';

export class Main extends Component {
    render() {
        return (
            <div className="custom-container">
                <Row>
                    <Col xs={12} lg={3}>
                        <Cards
                            data={this.props.data}
                            country={this.props.country}
                        />
                    </Col>
                    <Col xs={12} lg={9}>
                        <Graph
                            className="graph"
                            data={this.props.data}
                            country={this.props.country}
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Main;
