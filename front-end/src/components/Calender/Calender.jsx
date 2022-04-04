import { useEffect } from "react";
import { useCalendar } from "hooks";
import { months, daysInMonthFn } from "shared";
import axios from "axios";

export const Calendar = () => {
  const {
    month,
    year,
    date,
    setDate,
    monthChanger,
    weekDayHeader,
    monthInRows,
  } = useCalendar();

  useEffect(() => {
    setDate(new Date(`${months[month]} ${year}`));
  }, [month, year, setDate]);

  useEffect(() => {
    const lastday = daysInMonthFn(date);
    const queryMonth = month + 1;
    const url = `/api/tasks?startdate=${year}-${queryMonth}-1&enddate=${year}-${queryMonth}-${lastday}`;
    axios.get(url).then(data => console.log(data));
  }, [date]);

  return (
    <section className="calender">
      <h2 className="calendar__header">{`${
        months[date.getMonth()]
      } ${date.getFullYear()}`}</h2>
      <main className="calender__block">
        <div
          name="Previous"
          onClick={monthChanger}
          calender__monthchanger
          className="calender__monthchanger"
        >
          <i
            name="Previous"
            className="fa-solid fa-angle-left calender__monthchanger-arrow"
          ></i>
        </div>
        <div>
          <table>
            <thead>
              <tr>{weekDayHeader}</tr>
            </thead>
            <tbody>{monthInRows}</tbody>
          </table>
        </div>
        <div
          name="Next"
          onClick={monthChanger}
          className="calender__monthchanger"
        >
          <i
            name="Next"
            className="fa-solid fa-angle-right calender__monthchanger-arrow"
          ></i>
        </div>
      </main>
    </section>
  );
};
