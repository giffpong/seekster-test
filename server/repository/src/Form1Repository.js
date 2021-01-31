const models = require('../models');

function Form1Repository() {}

Form1Repository.prototype = {
  create: async (data) => {
    //insert
    if (typeof data === 'object' && !Array.isArray(data)) {
      const model = await models;
      const response = await model.form1.create(data);
      const result = JSON.parse(JSON.stringify(response));
      return result;
    } else {
      throw new Error('Data is not object');
    }
  },
};

module.exports = Form1Repository;
