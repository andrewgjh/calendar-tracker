import { useEffect, useState } from "react";
import { useCalendar } from "hooks";
import { months } from "shared";
// import axios from "axios";

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

  return (
    <section className="calender">
      <h2 className="calendar__header">{`${
        months[date.getMonth()]
      } ${date.getFullYear()}`}</h2>
      <main className="calender__block">
        <div
          name="Previous"
          onClick={monthChanger}
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
