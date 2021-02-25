import React, { useState, useEffect } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import { getDailyReport } from '../fetch';
import Loader from './Loader';

const Graph = ({ data: { confirmed, deaths, recovered }, country }) => {
    const [getData, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => setData(await getDailyReport());
        fetchData();
    }, []);

    const allCountries = getData.length ? (
        <Line
            data={{
                labels: getData.map(({ date }) => date),
                datasets: [
                    {
                        label: 'Confirmed Cases',
                        data: getData.map(({ confirmed }) => confirmed),
                        borderColor: '#0D6EFD',
                        backgroundColor: '#0D6EFD',
                    },
                    {
                        label: 'Deaths',
                        data: getData.map(({ deaths }) => deaths),
                        borderColor: '#DC3545',
                        backgroundColor: '#DC3545',
                    },
                ],
            }}
            options={{
                maintainAspectRatio: true,
                labels: {
                    fontColor: 'black',
                    fontFamily:
                        "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif",
                },
                elements: {
                    point: {
                        radius: 1,
                        hoverRadius: 5,
                    },
                    line: {
                        fill: false,
                    },
                },
            }}
        />
    ) : (
        <div className="graphLoader">
            <Loader title="𝐿𝑜𝒶𝒹𝒾𝓃𝑔" />
        </div>
    );

    const singleCountry = country ? (
        <Doughnut
            data={{
                labels: ['Infected', 'Recovered', 'Deaths'],
                datasets: [
                    {
                        label: 'People',
                        backgroundColor: [
                            'rgba(13, 110, 253, 0.9)',
                            'rgba(29, 185, 84, 0.9)',
                            'rgba(220, 53, 69, 0.9)',
                        ],
                        data: [confirmed.value, recovered.value, deaths.value],
                        hoverBackgroundColor: ['#0D6EFD', '#1db954', '#DC3545'],
                        borderWidth: 1,
                    },
                ],
            }}
            options={{
                legend: {
                    labels: {
                        fontColor: 'black',
                        fontFamily:
                            "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif",
                    },
                },
                title: {
                    display: true,
                    fontColor: 'black',
                    fontFamily:
                        "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif",
                    text: `Current Status of ${country}`,
                    fontSize: 14,
                    fontStyle: '500',
                },
                animation: {
                    animateScale: true,
                },
            }}
        />
    ) : (
        <div className="graphLoader">
            <Loader title="𝐿𝑜𝒶𝒹𝒾𝓃𝑔" />
        </div>
    );

    return (
        <div>
            <div>{country ? singleCountry : allCountries}</div>
        </div>
    );
};

export default Graph;
