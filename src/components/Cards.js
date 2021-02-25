import React, { Component } from 'react';
import moment from 'moment';
import { Alert, Row, Col } from 'react-bootstrap';
import { CountUp } from 'countup.js';

export class Cards extends Component {
    componentDidMount() {
        this.props.data.confirmed
            ? this.count(
                  this.props.data.confirmed.value,
                  this.props.data.recovered.value,
                  this.props.data.deaths.value
              )
            : this.count('0');
    }

    componentDidUpdate() {
        this.count(
            this.props.data.confirmed.value,
            this.props.data.recovered.value,
            this.props.data.deaths.value
        );
    }

    count = (num, num2, num3) => {
        const confirmed = new CountUp('confirmed', num);
        const recovered = new CountUp('recovered', num2);
        const deaths = new CountUp('deaths', num3);

        setTimeout(() => {
            confirmed.start();
            recovered.start();
            deaths.start();
        }, 100);
    };

    render() {
        const cards = [
            {
                name: 'Confirmed Cases',
                variant: 'primary',
                id: 'confirmed',
            },
            {
                name: 'Recovered Peoples',
                variant: 'success',
                id: 'recovered',
            },
            {
                name: 'Total Death',
                variant: 'danger',
                id: 'deaths',
            },
        ];

        return (
            <Row>
                {cards.map(({ name, variant, id }) => {
                    return (
                        <Col sm={4} lg={12} key={id}>
                            <Alert variant={variant}>
                                <Alert.Heading>{name}</Alert.Heading>
                                <hr />
                                <p id={id}></p>
                            </Alert>
                        </Col>
                    );
                })}
                <Col sm={{span: 4, offset: 8 }} lg={{span: 12, offset: 0 }}>
                    <Alert variant="light">
                        <p className="mb-0">
                            {this.props.data.confirmed
                                ? `Updated ${moment(this.props.data.date, "MMMM Do YYYY").startOf('hour').fromNow()}`
                                : '𝐿𝑜𝒶𝒹𝒾𝓃𝑔...'}
                        </p>
                    </Alert>
                </Col>
            </Row>
        );
    }
}

export default Cards;
