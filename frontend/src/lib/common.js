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
