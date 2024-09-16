import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./HabitDatePicker.css";
import { useEffect, useRef } from "react";

export default function HabitDatePicker({ disabled, onChange, selectedDates }) {
  const habitDatePickerRef = useRef(null);

  useEffect(() => {
    if (
      !habitDatePickerRef.current ||
      habitDatePickerRef.current.getAttribute("data-initialized")
    ) {
      return;
    }

    const habitDatePicker = habitDatePickerRef.current;

    habitDatePicker
      .querySelectorAll(".react-datepicker__day-name")
      .forEach((dayOfWeek, index) => {
        const label = dayOfWeek.innerHTML;
        dayOfWeek.innerHTML = `<input id="dayOfWeek${index}" name="dayOfWeek" value="${index}" type="checkbox"><label for="dayOfWeek${index}">${label}</label>`;
      });

    habitDatePicker.setAttribute("data-initialized", true);
  }, []);

  return (
    <div
      className="habit-datepicker"
      disabled={disabled}
      ref={habitDatePickerRef}
    >
      <div className="d-flex">
        <div className="d-flex"></div>
        <div>
          <DatePicker
            selectsMultiple
            selectedDates={selectedDates}
            onChange={onChange}
            value={undefined}
            inline
          ></DatePicker>
        </div>
      </div>
    </div>
  );
}
