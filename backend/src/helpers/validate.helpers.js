// Regular expression for email validation
const emailRegex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

// Check if the value is not empty and trimmed
const isNotEmptyAndTrimmed = (value) => {
  if (!value) {
    return false;
  }
  return value.toString().trim() !== "";
};

// Check if the value is not empty
const isNotEmpty = isNotEmptyAndTrimmed;

// Check if the value is a positive ID
const isID = (value) => {
  return isNotEmptyAndTrimmed(value) && Number(value) > 0;
};

// Check if the value is a valid email address
const isEmail = (value) => {
  return isNotEmptyAndTrimmed(value) && emailRegex.test(value);
};

// Check if the value is a valid phone number (10 digits)
const isPhoneNo = (value) => {
  return isNotEmptyAndTrimmed(value) && value.toString().trim().length === 10;
};

// Check if the value is a valid password (at least 7 characters)
const isPassword = (value) => {
  return isNotEmptyAndTrimmed(value) && value.toString().trim().length >= 7;
};

module.exports = {
  isNotEmpty,
  isPassword,
  isPhoneNo,
  isEmail,
  isID,
};
