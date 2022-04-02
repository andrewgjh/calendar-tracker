import { useEffect } from "react";
import { useCalendar } from "hooks";
import {
  currentDayString,
  firstDayOfMonth,
  daysInMonthFn,
  weekDays,
  months,
} from "shared";

export const Calendar = () => {
  const { month, year, date, setDate, monthChanger } = useCalendar();
  const weekDayHeader = weekDays.map(weekday => {
    return (
      <th key={weekday} className="calendar__weekdayheader">
        {weekday}
      </th>
    );
  });

  useEffect(() => {
    setDate(new Date(`${months[month]} ${year}`));
  }, [month, year]);

  const emptydays = [];
  for (let i = 0; i < firstDayOfMonth(date); i++) {
    emptydays.push(
      <td key={`empty ${i}`} className="calendar-day empty">
        {""}
      </td>
    );
  }

  const daysInMonth = [];
  for (let d = 1; d <= daysInMonthFn(date); d++) {
    const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${d}`;
    const currentDayClass =
      currentDayString() === dateString ? "current-day" : "";
    daysInMonth.push(
      <td key={d} id={dateString} className="calendar-day">
        <span className={currentDayClass}>{d}</span>
      </td>
    );
  }

  const totalSlots = [...emptydays, ...daysInMonth];
  let rows = [];
  let cells = [];

  totalSlots.forEach((slot, index) => {
    if (index % 7 !== 0) {
      cells.push(slot); // if index not equal 7 that means not go to next week
    } else {
      rows.push(cells); // when reach next week we contain all td in last week to rows
      cells = []; // empty container
      cells.push(slot); // in current loop we still push current row to new container
    }
    if (index === totalSlots.length - 1) {
      // when end loop we add remain date
      rows.push(cells);
    }
  });

  let monthInRows = rows.map((week, i) => {
    if (week.length > 0) {
      return <tr key={`week ${i}`}>{week}</tr>;
    }
  });

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
