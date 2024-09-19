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
  const [errors, setErrors] = useState({});

  const validate = (form) => {
    const validation = {};

    for (const field of form.elements) {
      const fieldName = field.getAttribute("name");

      if (!fieldName) {
        continue;
      }

      if (!!field.getAttribute("data-required") && !field.value) {
        validation[fieldName] = "Questo campo non può essere vuoto";
      }
    }

    return validation;
  };

  const revalidate = (e) => {
    const validation = validate(e.target.closest('form'));
    setErrors(validation)
  } 

  const onSubmit = async (e) => {
    e.preventDefault();

    const validation = validate(e.target);

    if (!!Object.values(validation).length) {
      setErrors(validation);
      console.error(validation);

      return;
    }

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
        habitSchedule: {
          daily: habitRecurrence.value === "daily",
          dayOfWeek:
            habitRecurrence.value === "weekly"
              ? new Date().getDay()
              : undefined,
          dayOfMonth:
            habitRecurrence.value === "monthly"
              ? new Date().getMonth()
              : undefined,
        },
      });

      setErrors({});

      navigate("/");
    } catch (ex) {
      console.error(ex);
      setErrors({ global: "Si è verificato un errore interno al server" });
    }
  };

  return (
    <form onSubmit={onSubmit} className="habit-form-create py-5">
      <div className="form-group">
        <label htmlFor="name">Nome</label>
        <input
          data-required onChange={revalidate}
          className="form-control"
          name="name"
          id="name"
          type="text"
        ></input>
        {errors.name && <div className="text-danger">{errors.name}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="description">Descrizione</label>
        <textarea
          className="form-control"
          name="description"
          id="description"
          type="text"
        ></textarea>
        {errors.description && <div className="text-danger">{errors.description}</div>}
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-12 col-lg-6">
            <div className="form-group">
              <label htmlFor="startDate">Data inizio</label>
              <input
                data-required onChange={revalidate}
                className="form-control"
                name="startDate"
                id="startDate"
                type="date"
              ></input>
              {errors.startDate && <div className="text-danger">{errors.startDate}</div>}
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="form-group">
              <label htmlFor="endDate">Data fine</label>
              <input
                data-required onChange={revalidate}
                className="form-control"
                name="endDate"
                id="endDate"
                type="date"
              ></input>
              {errors.endDate && <div className="text-danger">{errors.endDate}</div>}
            </div>
          </div>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="targetValue">Obiettivo</label>
        <input
          data-required onChange={revalidate}
          className="form-control"
          name="targetValue"
          id="targetValue"
          type="number"
          max={999999}
        ></input>
        {errors.targetValue && <div className="text-danger">{errors.targetValue}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="habitRecurrence">
          Con quale frequenza vuoi effettuare questa abitudine?
        </label>
        <select
          defaultValue="daily"
          className="form-select"
          id="habitRecurrence"
          name="habitRecurrence"
        >
          <option value="daily">Giornaliera</option>
          <option value="weekly">Settimanale</option>
          <option value="monthly">Mensile</option>
        </select>
        {errors.habitRecurrence && <div className="text-danger">{errors.habitRecurrence}</div>}
      </div>

      <Button>Crea</Button>
    </form>
  );
}
