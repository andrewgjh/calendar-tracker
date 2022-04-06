//CONSTANTS

export const weekDays = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

//FUNCTIONS
export const currentDayString = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const monthAddZero = month.toString().length > 1 ? "" : "0";
  const dateAddZero = day.toString().length > 1 ? "" : "0";
  return `${year}-${monthAddZero}${month}-${dateAddZero}${day}`;
};

export const firstDayOfMonth = date => {
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const firstDay = firstDayOfMonth.getDay();
  return firstDay;
};

export const daysInMonthFn = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  return new Date(year, month, 0).getDate();
};

export const groupBy = (objArray, groupByKey) => {
  return objArray.reduce((acc, obj) => {
    const key = obj[groupByKey];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
};
