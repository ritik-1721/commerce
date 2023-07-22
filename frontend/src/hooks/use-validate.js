const emailRegex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export const isNotEmpty = (value) => {
  if (!value) {
    return false;
  }
  if (value.trim() === "") {
    return false;
  }
  return true;
};

export const isPhoneNo = () => {
  if (!value) {
    return false;
  }
  if (value.trim() === "") {
    return false;
  }
  if (value.trim().length != 10) {
    return false;
  }
  return true;
};

export const isPassword = (value) => {
  if (!value) {
    return false;
  }
  if (value.trim() === "") {
    return false;
  }
  if (value.trim().length < 7) {
    return false;
  }
  return true;
};

export const isEmail = (value) => {
  if (!value) {
    return false;
  }
  if (value.trim() === "") {
    return false;
  }
  if (emailRegex.test(value) === false) {
    return false;
  }
  return true;
};
