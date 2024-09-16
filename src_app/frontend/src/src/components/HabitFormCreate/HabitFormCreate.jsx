import { useRef, useState } from "react";
import { trpc } from "../../lib/trpc";
import Button from "../Button/Button";
import HabitDatePicker from "../HabitDatePicker/HabitDatePicker";
import "./HabitFormCreate.css";

export default function HabitFormCreate() {
  const [isDaily, setIsDaily] = useState(false);
  const [selectedDates, setSelectedDates] = useState([]);
  const onDatePickerChange = (dates) => {
    setSelectedDates(dates);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const {
      name,
      description,
      startDate,
      endDate,
      targetValue,
      abitType,
      priority,
      dayOfWeek,
    } = e.target.elements;

    console.log(e.target.elements);

    const habitSchedules = [];

    if (isDaily) {
      habitSchedules.push({
        daily: true,
      });
    } else {
      habitSchedules.push(
        ...Array.from(dayOfWeek)
          .filter((radio) => radio.checked)
          .map((radio) => parseInt(radio.value))
      );

      habitSchedules.push()
    }

    try {
      await trpc.habit.create.mutate({
        name: name.value,
        description: description.value,
        startDate: new Date(startDate.value),
        endDate: new Date(endDate.value),
        targetValue: parseInt(targetValue.value) || 0,
        abitType: abitType.value,
        priority: parseInt(priority.value) || 0,
        habitSchedules,
      });
    } catch (ex) {
      console.error(ex);
    }
  };

  return (
    <form onSubmit={onSubmit} className="habit-form-create py-5">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          className="form-control"
          name="name"
          id="name"
          type="text"
        ></input>
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          className="form-control"
          name="description"
          id="description"
          type="text"
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="startDate">Start Date</label>
        <input
          className="form-control"
          name="startDate"
          id="startDate"
          type="date"
        ></input>
      </div>
      <div className="form-group">
        <label htmlFor="endDate">End Date</label>
        <input
          className="form-control"
          name="endDate"
          id="endDate"
          type="date"
        ></input>
      </div>
      <div className="form-group">
        <label htmlFor="targetValue">Target Value</label>
        <input
          className="form-control"
          name="targetValue"
          id="targetValue"
          type="date"
        ></input>
      </div>
      <div className="form-group">
        <label htmlFor="abitType">Abit Type</label>
        <input
          className="form-control"
          name="abitType"
          id="abitType"
          type="text"
        ></input>
      </div>
      <div className="form-group">
        <label htmlFor="priority">Priority</label>
        <input
          className="form-control"
          name="priority"
          id="priority"
          type="number"
        ></input>
      </div>

      <div className="form-group">
        <input
          value="true"
          onChange={(e) => setIsDaily(e.target.checked)}
          className="form-check-input"
          name="daily"
          id="daily"
          type="checkbox"
        ></input>
        <label htmlFor="daily" className="ms-2">
          Daily
        </label>
      </div>

      <div className="my-5">
        <HabitDatePicker selectedDates={selectedDates} onChange={onDatePickerChange} disabled={isDaily}></HabitDatePicker>
      </div>

      <Button>Create</Button>
    </form>
  );
}
