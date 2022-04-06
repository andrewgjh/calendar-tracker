export const CalendarDay = props => {
  const { d, dateString, currentDayClass, dailyTasks } = props;

  const completed =
    !dailyTasks?.false && new Date(dateString) < new Date() ? (
      <div className="complete-wrapper">
        <i class="fa-solid fa-check complete-check"></i>
      </div>
    ) : null;
  return (
    <td key={d} id={dateString} className="calendar-day">
      <span className={currentDayClass}>{d}</span>
      {completed}
    </td>
  );
};
