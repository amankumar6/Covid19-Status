import moment from 'moment';
const endpoint = 'https://covid19.mathdro.id/api';

export const getDailyReport = async () => {
    try {
        const response = await fetch(`${endpoint}/daily`);
        const fetchedData = await response.json();

        return fetchedData.map((data) => ({
            confirmed: data.confirmed.total,
            deaths: data.deaths.total,
            date: moment(data.reportDate).format('MMM Do YY'),
        }));
    } catch (err) {
        console.log(err);
    }
};

export const getCountries = async () => {
    try {
        const response = await fetch(`${endpoint}/countries`);
        const fetchedData = await response.json();
        return fetchedData.countries.map((country) => country.name);
    } catch (err) {
        console.log(err);
    }
};

export const getCountryData = async (countryName) => {
    try {
        let response;

        countryName
            ? (response = await fetch(`${endpoint}/countries/${countryName}`))
            : (response = await fetch(`${endpoint}`));

        const fetchedData = await response.json();

        return {
            confirmed: fetchedData.confirmed,
            recovered: fetchedData.recovered,
            deaths: fetchedData.deaths,
            date: moment(fetchedData.reportDate).format('MMMM Do YYYY'),
        };
    } catch (err) {
        console.log(err);
    }
};
