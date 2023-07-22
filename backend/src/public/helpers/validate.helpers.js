const emailRegex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const isNotEmpty = (value) => {
  if (!value) {
    return false;
  }
  if (value.toString().trim() === "") {
    return false;
  }
  return true;
};

const isID = (value) => {
  if (!value) {
    return false;
  }
  if (value.toString().trim() === "") {
    return false;
  }
  if (+value <= 0) {
    return false;
  }
  return true;
};

const isEmail = (value) => {
  if (!value) {
    return false;
  }
  if (value.toString().trim() === "") {
    return false;
  }
  if (emailRegex.test(value) === false) {
    return false;
  }
  return true;
};

const isPhoneNo = (value) => {
  if (!value) {
    return false;
  }
  if (value.toString().trim() === "") {
    return false;
  }
  if (value.toString().trim().length != 10) {
    return false;
  }
  return true;
};

const isPassword = (value) => {
  if (!value.toString()) {
    return false;
  }
  if (value.toString().trim() === "") {
    return false;
  }
  if (value.toString().trim().length < 7) {
    return false;
  }
  return true;
};

const strTrim = (value) => value.toString().trim();
