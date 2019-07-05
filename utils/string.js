const formatHour = value => value <= 9 ? `0${value}` : value;

module.exports = {formatHour};