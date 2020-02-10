const redis = require('redis');
const {promisify} = require('util');

const REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379'

module.exports = require('redis').createClient(REDIS_URL);

// exports.pub = require('redis').createClient();
// exports.sub = require('redis').createClient();