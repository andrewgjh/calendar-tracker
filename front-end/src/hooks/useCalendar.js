import { useState } from "react";
import { months } from "shared";

export const useCalendar = () => {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [date, setDate] = useState(new Date(`${months[month]} ${year}`));

  const monthChanger = e => {
    if (e.target.getAttribute("name") === "Previous") {
      if (month === 0) {
        setMonth(11);
        setYear(prev => prev - 1);
      } else {
        setMonth(prev => prev - 1);
      }
    }
    if (e.target.getAttribute("name") === "Next") {
      if (month === 11) {
        setMonth(0);
        setYear(prev => prev - 1);
      } else {
        setMonth(prev => prev + 1);
      }
    }
  };
  return { month, year, date, setDate, monthChanger };
};
