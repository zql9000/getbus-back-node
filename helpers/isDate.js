const { DateTime } = require('luxon');

const isDate = (value, { req, location, path }) => {
  if (!value && value !== 0) {
    return false;
  }

  try {
    const luxonDate = DateTime.fromJSDate(value);
    return luxonDate.isValid();
  } catch (error) {
    return false;
  }
};

module.exports = { isDate };
