const axios = require('axios');

const token = '5zsd/y4p+M/fXFHBzXnkG2J5qO9ehKLfxvRCbk7DOx3zJo9im3YFUM98c3yTDXXjJYDklGfMKIB5JcoOnrYN2A=='
const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token
};

//returns data from the api for projections in the US
exports.getProjections = async (req, res) => {
    try {
        const series = req.query.series;
        const response = await axios.get(`https://api.careeronestop.org/v1/employmentpatterns/UUOFb6hCozY4Od9/${series}/0/0/0/3?enableMetaData=true`, { headers });
        res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

//returns data from the api for wages in wisconsin
exports.getSalaries = async (req, res) => {
    try {
        const series = req.query.series;
        const response = await axios.get(`https://api.careeronestop.org/v1/comparesalaries/UUOFb6hCozY4Od9/wage?keyword=${series}&location=Wisconsin&enableMetaData=false`, { headers });
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};