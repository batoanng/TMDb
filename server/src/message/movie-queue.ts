// @ts-nocheck
require('dotenv').config();
const amqp = require('amqplib/callback_api');

const { QUEUE_NAME, RABBITMQ_CONNECTION_URL } = process.env;
let channel = null;

// if the connection is closed or fails to be established at all, we will reconnect
let amqpConn = null;
function start() {
    amqp.connect(
        RABBITMQ_CONNECTION_URL + '?heartbeat=60',
        function (err, conn) {
            if (err) {
                console.error('[AMQP]', err.message);
                return setTimeout(start, 7000);
            }
            conn.on('error', function (err) {
                if (err.message !== 'Connection closing') {
                    console.error('[AMQP] conn error', err.message);
                }
            });
            conn.on('close', function () {
                console.error('[AMQP] reconnecting');
                return setTimeout(start, 7000);
            });

            console.info('[AMQP] connected');
            amqpConn = conn;

            whenConnected();
        }
    );
}
function whenConnected() {
    amqpConn.createChannel(function (err, ch) {
        if (closeOnErr(err)) return;
        ch.on('error', function (err) {
            console.error('[AMQP] channel error', err.message);
        });
        ch.on('close', function () {
            console.info('[AMQP] channel closed');
        });
        channel = ch;
        ch.assertQueue(QUEUE_NAME, {
            durable: true,
        });
    });
}

function closeOnErr(err) {
    if (!err) return false;
    console.error('[AMQP] error', err);
    amqpConn.close();
    return true;
}

start();

export default {
    publishToQueue: async (data) => {
        console.info('Send message:', data);
        if (channel) {
            channel.sendToQueue(QUEUE_NAME, Buffer.from(data), {
                persistent: true,
            });
        }
    },
};
process.on('exit', () => {
    channel.close();
    console.info(`Closing rabbitmq channel`);
});
