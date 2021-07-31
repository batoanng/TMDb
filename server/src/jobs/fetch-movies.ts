const CronJob = require('cron').CronJob;
import { Movie } from '../models/movie';
import axios from 'axios';

// const job = new CronJob('* * 0 * * *', async function () {
const job = new CronJob('*/10 * * * * *', async function () {
    try {
        // const { data: movies } = await axios.get(
        //     `${process.env.DATA_URI}/discover/movie`,
        //     {
        //         params: { api_key: process.env.DATA_KEY },
        //     }
        // );
        // console.log(movies.results.length);
        console.log('Test cronjob...');
    } catch (e) {
        console.error(e);
    }
});

export default job;
