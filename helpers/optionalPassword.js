const optionalPassword = (value, { req, location, path }) => {
  if (!value || value?.length === 0) {
    return true;
  }

  try {
    return value.length > 7;
  } catch (error) {
    return false;
  }
};

module.exports = { optionalPassword };
