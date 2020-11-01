const is4xx = (res) => res.statusCode >= 400 && res.statusCode < 500;
const is5xx = (res) => res.statusCode >= 500;
const isError = (res) => res.statusCode >= 400;

module.exports = { is4xx, is5xx, isError };