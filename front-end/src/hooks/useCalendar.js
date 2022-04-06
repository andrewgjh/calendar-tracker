import { useState, useEffect } from "react";
import axios from "axios";
import {
  months,
  weekDays,
  currentDayString,
  firstDayOfMonth,
  daysInMonthFn,
  groupBy,
} from "shared";
import { CalendarDay } from "components/CalendarDay";

export const useCalendar = () => {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [date, setDate] = useState(new Date(year, month));
  const [tasksObj, setTasksObj] = useState({});

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
    const monthAddZero = (date.getMonth() + 1).toString().length > 1 ? "" : "0";
    const dateAddZero = d.toString().length > 1 ? "" : "0";
    const dateString = `${date.getFullYear()}-${monthAddZero}${
      date.getMonth() + 1
    }-${dateAddZero}${d}`;
    let dailyTasks = null;
    const currentDayClass =
      currentDayString() === dateString ? "current-day" : "";
    if (dateString in tasksObj) {
      dailyTasks = groupBy(tasksObj[dateString], "is_completed");
    }
    daysInMonth.push(
      <CalendarDay
        key={d}
        d={d}
        dateString={dateString}
        currentDayClass={currentDayClass}
        dailyTasks={dailyTasks}
      />
    );
  }
  const weekDayHeader = weekDays.map(weekday => {
    return (
      <th key={weekday} className="calendar__weekdayheader">
        {weekday}
      </th>
    );
  });

  const totalSlots = [...emptydays, ...daysInMonth];
  let rows = [];
  let cells = [];

  totalSlots.forEach((slot, index) => {
    if (index % 7 !== 0) {
      cells.push(slot);
    } else {
      rows.push(cells);
      cells = [];
      cells.push(slot);
    }
    if (index === totalSlots.length - 1) {
      rows.push(cells);
    }
  });

  let monthInRows = rows.map((week, i) => {
    if (week.length > 0) {
      return <tr key={`week ${i}`}>{week}</tr>;
    }
    return null;
  });

  useEffect(() => {
    const lastday = daysInMonthFn(date);
    const queryMonth = month + 1;
    const url = `/api/tasks?startdate=${year}-${queryMonth}-1&enddate=${year}-${queryMonth}-${lastday}`;
    axios.get(url).then(res => {
      setTasksObj(groupBy(res.data, "task_date"));
    });
  }, [date]);

  return {
    month,
    year,
    date,
    setDate,
    monthChanger,
    weekDayHeader,
    emptydays,
    daysInMonth,
    monthInRows,
    tasksObj,
  };
};
