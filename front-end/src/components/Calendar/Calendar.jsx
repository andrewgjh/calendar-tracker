import { useEffect, useState } from "react";
import { useCalendar } from "hooks";
import { months } from "shared";

export const Calendar = () => {
  const {
    month,
    year,
    date,
    setDate,
    monthChanger,
    weekDayHeader,
    monthInRows,
    tasksObj,
  } = useCalendar();

  useEffect(() => {
    setDate(new Date(`${months[month]} ${year}`));
  }, [month, year, setDate]);

  console.log(tasksObj);
  return (
    <section className="calendar">
      <h2 className="calendar__header">{`${
        months[date.getMonth()]
      } ${date.getFullYear()}`}</h2>
      <main className="calendar__block">
        <div
          name="Previous"
          onClick={monthChanger}
          className="calendar__monthchanger"
        >
          <i
            name="Previous"
            className="fa-solid fa-angle-left calendar__monthchanger-arrow"
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
          className="calendar__monthchanger"
        >
          <i
            name="Next"
            className="fa-solid fa-angle-right calendar__monthchanger-arrow"
          ></i>
        </div>
      </main>
    </section>
  );
};
