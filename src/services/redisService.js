const redis = require('redis');
const client = redis.createClient(process.env.REDIS_URL);

const setOTP = (key, value, ttl = 300) => {
    return new Promise((resolve, reject) => {
        client.setex(key, ttl, value, (err, reply) => {
            if (err) reject(err);
            resolve(reply);
        });
    });
};

const getOTP = (key) => {
    return new Promise((resolve, reject) => {
        client.get(key, (err, reply) => {
            if (err) reject(err);
            resolve(reply);
        });
    });
};

module.exports = { setOTP, getOTP };