// server/app.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const momentTimeZone = require('moment-timezone');
const Form1Repository = require('./repository/src/Form1Repository');
const form1Repository = new Form1Repository();

const TIMEZONE = 'Asia/Bangkok';
const BIRTH_DAY_FORMAT = 'DD/MM/YYYY';
const app = express();
const corsOptions = {
  origin: 'http://localhost:3000',
};

const _calculateAge = (birthday) => {
  // birthday is a date
  var ageDifMs = Date.now() - birthday.getTime();
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// Server static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

app.post('/submit', async (req, res) => {
  const idCard = req.body.idCard ? req.body.idCard : '';
  const Name = req.body.Name ? req.body.Name : '';
  const dateOfBirth = req.body.dateOfBirth ? req.body.dateOfBirth : '';
  const nameArr = Name.split(' ');
  const firstName = nameArr[0];
  const lastName = nameArr.length > 1 ? nameArr[1] : '';
  const age =
    dateOfBirth !== null ? _calculateAge(new Date(momentTimeZone(dateOfBirth, BIRTH_DAY_FORMAT).tz(TIMEZONE))) : 0;
  const isPass = idCard !== null && idCard.toString().length === 13 && Name !== null && Name !== '' && age >= 18;
  if (isPass) {
    let result = {
      FirstName: firstName,
      LastName: lastName,
      Age: age,
    };
    res.status(201).send(result);
  } else {
    try {
      let data = {
        id_card: idCard,
        name: Name,
        date_of_birth: dateOfBirth,
      };
      const response = await form1Repository.create(data);
      console.log('🚀 ~ app.post ~ response', response);
    } catch (error) {
      console.log('🚀 ~ app.post ~ error', error);
    }
    res.status(400).send({
      error: 'Error',
    });
  }
});

module.exports = app;
