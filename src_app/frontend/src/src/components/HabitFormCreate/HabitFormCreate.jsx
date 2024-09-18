import { useRef, useState } from "react";
import { trpc } from "../../lib/trpc";
import Button from "../Button/Button";
import HabitDatePicker from "../HabitDatePicker/HabitDatePicker";
import "./HabitFormCreate.css";
import CircularCheckBox from "../CircularCheckBox/CircularCheckBox";
import { useNavigate } from "react-router-dom";

export default function HabitFormCreate() {
  const [isDaily, setIsDaily] = useState(false);
  const [selectedDates, setSelectedDates] = useState([]);
  const onDatePickerChange = (dates) => {
    setSelectedDates(dates);
  };
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    const {
      name,
      description,
      startDate,
      endDate,
      targetValue,
      habitRecurrence,
    } = e.target.elements;

    try {
      await trpc.habit.create.mutate({
        name: name.value,
        description: description.value,
        startDate: new Date(startDate.value) || undefined,
        endDate: new Date(endDate.value) || undefined,
        targetValue: parseInt(targetValue.value) || 0,
        habitSchedule: 
          {
            daily: habitRecurrence.value === 'daily',
            dayOfWeek: habitRecurrence.value === 'weekly' ? (new Date()).getDay() : undefined,
            dayOfMonth: habitRecurrence.value === 'monthly' ? (new Date()).getMonth() : undefined,
          }
      });

      navigate("/");
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
        <div className="row">
          <div className="col-12 col-lg-6">
            <div className="form-group">
              <label htmlFor="startDate">Start Date</label>
              <input
                className="form-control"
                name="startDate"
                id="startDate"
                type="date"
              ></input>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="form-group">
              <label htmlFor="endDate">End Date</label>
              <input
                className="form-control"
                name="endDate"
                id="endDate"
                type="date"
              ></input>
            </div>
          </div>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="targetValue">Target Value</label>
        <input
          className="form-control"
          name="targetValue"
          id="targetValue"
          type="number"
        ></input>
      </div>

      <div className="form-group">
        <label htmlFor="habitRecurrence">What is the habit recurrence?</label>
        <select class="form-select" id="habitRecurrence" name="habitRecurrence">
          <option selected value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      <Button>Create</Button>
    </form>
  );
}
