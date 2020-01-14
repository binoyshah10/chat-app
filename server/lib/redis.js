const redis = require('redis');
const {promisify} = require('util');

// const REDIS_URL = process.env.REDIS_URL;

module.exports = require('redis').createClient();

// exports.pub = require('redis').createClient();
// exports.sub = require('redis').createClient();