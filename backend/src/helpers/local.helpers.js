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
  
  if (str === "yyyy") {
    return `${yyyy}`;
  }
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

function isEmptyObject(obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}

function numberToWords(number) {
  const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
  const teens = ["", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const tens = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  const thousands = ["", "Thousand", "Million", "Billion"];

  function toWords(num) {
      if (num === 0) return "Zero";
      let result = "";
      for (let i = 0; num > 0; i++) {
          const chunk = num % 1000;
          if (chunk !== 0) {
              result = convert(chunk) + thousands[i] + " " + result;
          }
          num = Math.floor(num / 1000);
      }
      return result.trim();
  }

  function convert(num) {
      if (num >= 100) {
          return ones[Math.floor(num / 100)] + " Hundred " + convert(num % 100);
      } else if (num >= 20) {
          return tens[Math.floor(num / 10)] + " " + ones[num % 10];
      } else if (num >= 11) {
          return teens[num - 10];
      } else {
          return ones[num];
      }
  }

  const dollars = Math.floor(number);
  const cents = Math.round((number - dollars) * 100);

  let result = toWords(dollars);
  if (cents > 0) {
      result += " and " + toWords(cents) + "/100";
  }

  return result;
}


module.exports = {
  numberToWords,
  isEmptyObject,
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
