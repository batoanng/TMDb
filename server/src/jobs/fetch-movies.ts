const CronJob = require('cron').CronJob;
import movieQueue from '../message/movie-queue';
const moment = require('moment');
import axios from 'axios';

const job = new CronJob('* * 1 * * *', async function () {
    try {
        const currentDate = new Date();
        const yesterdayStr = moment(currentDate)
            .subtract(1, 'days')
            .format('YYYY-MM-DD');
        const currentDateStr = moment(currentDate).format('YYYY-MM-DD');
        let page = 1;
        let totalPages = 1;
        let movies: any[] = [];
        do {
            const { data } = await axios.get(
                `${process.env.DATA_URI}/discover/movie`,
                {
                    params: {
                        api_key: process.env.DATA_KEY,
                        'primary_release_date.gte': yesterdayStr,
                        'primary_release_date.lte': currentDate,
                    },
                }
            );
            movies = [...movies, ...data.results];
            page++;
            totalPages = data.total_pages;
        } while (page <= totalPages);
        for (let i = 0; i < movies.length; i++) {
            movieQueue.publishToQueue(movies[i].id.toString());
        }
    } catch (e) {
        console.error(e);
    }
});

export default job;
