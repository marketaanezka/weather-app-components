export const getTimefromUnix = (unix) => {
  return `
    ${new Date(unix * 1000).getHours()}:${new Date(unix * 1000).getMinutes()}
    `;
};

export const filterForecast = (array) => {
  return array.filter((item, index) => index % 8 === 0);
};

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const getDayfromUnix = (unix) => {
  const date = new Date(unix * 1000);
  return `
  ${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}
  `;
};
