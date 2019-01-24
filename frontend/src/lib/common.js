const UNITS = ["K", "M", "B", "T"];
const objMap = ["years", "months", "days", "hours", "minutes", "seconds"];
const numbers = "\\d+(?:[\\.,]\\d{0,3})?";
const datePattern = `(${numbers}Y)?(${numbers}M)?(${numbers}D)?`;
const timePattern = `T(${numbers}H)?(${numbers}M)?(${numbers}S)?`;
const pattern = new RegExp(`P(?:${datePattern}(?:${timePattern})?)`);

export const getShortNumberString = number => {
  const shouldShowDecimalPlace = UNITS.some((element, index) => {
    const lowerBound = Math.pow(1000, index + 1);
    const upperBound = lowerBound + lowerBound * 10;
    return number > lowerBound && number < upperBound;
  });
  const digits = shouldShowDecimalPlace ? 1 : 0;
  for (let i = UNITS.length - 1; i >= 0; i--) {
    const decimal = Math.pow(1000, i + 1);

    if (number >= decimal) {
      return (number / decimal).toFixed(digits) + UNITS[i];
    }
  }
  return number.toString();
};

export const parseISO8601Time = duration => {
  return duration
    .match(pattern)
    .slice(1)
    .reduce((prev, next, idx) => {
      prev[objMap[idx]] = parseFloat(next) || 0;
      return prev;
    }, {});
};

export const getDurationString = value => {
  if (!value || value === "") return "";

  const { days, hours, minutes, seconds } = parseISO8601Time(value);

  let secondsString = seconds.toString();
  let minutesString = minutes.toString();
  const accumulatedHours = days * 24 + hours;

  if (seconds < 10) {
    secondsString = seconds.toString().padStart(2, "0");
  }
  if (minutes < 10 && hours !== 0) {
    minutesString = minutesString.toString().padStart(2, "0");
  }
  if (!accumulatedHours) {
    return [minutesString, secondsString].join(":");
  } else {
    return [accumulatedHours, minutesString, secondsString].join(":");
  }
};

export const getPublishedAtDate = value => {
  if (!value) return "";
  const date = new Date(Date.parse(value));

  return date.toDateString();
};

export const number_to_human_size = size => {
  const size_types = ["bytes", "kB", "MB", "GB", "TB", "PB"];
  const value = Math.floor(Math.log(size) / Math.log(1024));

  return (size / Math.pow(1024, value)).toFixed(2) + " " + size_types[value];
};

export const number_with_delimiter = size => {
  return String(size).replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
};

export const parseSize = size => {
  return number_with_delimiter(number_to_human_size(size));
};

export const isUrl = value => {
  const regex = /^(((http(s?))\:\/\/)?)([0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,6}(\:[0-9]+)?(\/\S*)?/;
  return regex.test(value);
};

export const removeEmptyParams = params => {
  for (const p in params) {
    if (!params[p] || params[p] === "undefined") {
      delete params[p];
    }
  }
  return params;
};

export const buildApiRequest = async (requestMethod, path, params) => {
  params = removeEmptyParams(params);

  const request = await window.gapi.client.request({
    method: requestMethod,
    path: path,
    params: params
  });

  return request;
};
