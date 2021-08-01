// @ts-nocheck
import axios from 'axios';
import { fetchThenPersistData } from '../services/movie';

require('dotenv').config();
const amqp = require('amqplib/callback_api');

const { QUEUE_NAME, RABBITMQ_CONNECTION_URL } = process.env;

export default {
    start() {
        amqp.connect(RABBITMQ_CONNECTION_URL, function (error0, connection) {
            if (error0) {
                throw error0;
            }
            connection.createChannel(function (error1, channel) {
                if (error1) {
                    throw error1;
                }
                const queue = QUEUE_NAME;

                channel.assertQueue(queue, {
                    durable: true,
                });
                channel.prefetch(1);
                channel.consume(
                    queue,
                    async function (msg) {
                        const id = msg.content.toString();
                        await fetchThenPersistData(id);
                        channel.ack(msg);
                    },
                    {
                        noAck: false,
                    }
                );
            });
        });
    },
};
