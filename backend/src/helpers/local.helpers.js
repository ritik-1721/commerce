var moment = require("moment"); // require

const capitalizeStr = (value) => value[0].toUpperCase() + value.slice(1);
const trimStr = (value) => capitalizeStr(value.toString().trim());

const getCurrentDateTime = (format = "YYYY-MM-DD hh:mm:ss", d = new Date()) => {
  return moment(d).format(format);
};

function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

const base_url = (req) => {
  return `${req.protocol}://${req.headers.host}/`;
};

const filterDataValues = async (data) => {
  let newData = await Promise.all(data.map(async (item) => item.dataValues));
  return newData;
};

const formatDate = (str, date = new Date()) => {
  const yyyy = date.getFullYear(); //year
  const mm = padTo2Digits(date.getMonth() + 1); //month
  const dd = padTo2Digits(date.getDate()); //date
  const h = padTo2Digits(date.getHours()); //hours
  const i = padTo2Digits(date.getMinutes()); //minutes
  const s = padTo2Digits(date.getSeconds()); //seconds
  if (str === "yyyy-mm-dd") {
    return `${yyyy}-${mm}-${dd}`;
  }
  if (str === "dd-mm-yyyy") {
    return `${dd}-${mm}-${yyyy}`;
  }
  if (str === "yyyy-mm-dd h:i:s") {
    return `${yyyy}-${mm}-${dd} ${h}:${i}:${s}`;
  }
  if (str === "dd-mm-yyyy h:i:s") {
    return `${dd}-${mm}-${yyyy} ${h}:${i}:${s}`;
  }
  return date;
};

// Truncate a string and add an ellipsis if it's longer than a certain length
const truncateString = (str, maxLength) => {
  if (str.length > maxLength) {
    return str.slice(0, maxLength) + "…";
  }
  return str;
};
// Deep clone an object
const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

// Generate a universally unique identifier (UUID)
const generateUUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

// Add a timeout to a promise
const promiseWithTimeout = (promise, timeoutMillis) => {
  const timeoutPromise = new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error("Promise timed out")), timeoutMillis);
  });

  return Promise.race([promise, timeoutPromise]);
};

// Check if a key exists in an object
const doesKeyExist = (obj, key) => key in obj;


const deduplicateArray = (arr) => {
  return [...new Set(arr)];
};


module.exports = {
  truncateString,
  generateUUID,
  deepClone,
  deduplicateArray,
  promiseWithTimeout,
  doesKeyExist,
  formatDate,
  filterDataValues,
  base_url,
  getCurrentDateTime,
  capitalizeStr,
  trimStr,
};
