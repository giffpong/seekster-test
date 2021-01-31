const momentTimeZone = require('moment-timezone');

const TIMEZONE = 'Asia/Bangkok';

let result = momentTimeZone('01/01/2009', 'DD/MM/YYYY').tz(TIMEZONE);
console.log('🚀 ~ result', result);

function _calculateAge(birthday) {
  // birthday is a date
  var ageDifMs = Date.now() - birthday.getTime();
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

let result2 = _calculateAge(new Date(result));
console.log('🚀 ~ result2', result2);
