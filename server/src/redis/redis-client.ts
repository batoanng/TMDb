require('dotenv').config();
const redis = require('redis');

export default redis.createClient(process.env.REDIS_URL, {
    password: process.env.REDIS_PASS,
});
