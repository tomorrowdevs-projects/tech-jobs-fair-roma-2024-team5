import { useState } from "react";
import { trpc } from "../../lib/trpc";
import { useNavigate } from "react-router-dom";
import {startOfDay} from 'date-fns'
import "./HabitFormCreate.css";

export default function HabitFormCreate() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const validate = (form) => {
    const validation = {};
    const today = new Date();

    for (const field of form.elements) {
      const fieldName = field.getAttribute("name");
      const value = field.value.trim();

      if (!fieldName) continue;

      if (!!field.getAttribute("data-required") && !value) {
        validation[fieldName] = "Questo campo non può essere vuoto";
      } else {
        switch (fieldName) {
          case "name":
            if (value.length < 3 || value.length > 50) {
              validation[fieldName] = "Il nome deve essere tra 3 e 50 caratteri";
            }
            break;
          case "description":
            if (value.length > 200) {
              validation[fieldName] = "La descrizione non può superare 200 caratteri";
            }
            break;
          case "startDate":
            const startDate = new Date(value);
            if (startDate < startOfDay(today) ) {
              validation[fieldName] = "La data di inizio non può essere nel passato";
            }
            break;
          case "endDate":
            const endDate = new Date(value);
            const startDateValue = form.elements.startDate.value;
            if (startDateValue && endDate <= new Date(startDateValue)) {
              validation[fieldName] = "La data di fine deve essere successiva alla data di inizio";
            }
            break;
          case "targetValue":
            const target = parseInt(value);
            if (isNaN(target) || target <= 0 || target > 999999) {
              validation[fieldName] = "L'obiettivo deve essere un numero positivo non superiore a 999999";
            }
            break;
          default:
        }
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
    <form onSubmit={onSubmit} className="habit-form-create">
      <div className="form-group">
        <label htmlFor="name">Nome</label>
        <input
          data-required onChange={revalidate}
          className="habit-input"
          name="name"
          id="name"
          type="text"
          maxLength={50}
          placeholder="Nome dell'abitudine"
        />
        {errors.name && <div className="error-message">{errors.name}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="description">Descrizione</label>
        <textarea
          onChange={revalidate}
          className="habit-input"
          name="description"
          id="description"
          maxLength={200}
          placeholder="Descrivi la tua abitudine"
        />
        {errors.description && <div className="error-message">{errors.description}</div>}
      </div>

      <div className="form-group date-group">
        <div className="date-input">
          <label htmlFor="startDate">Data inizio</label>
          <input
            data-required onChange={revalidate}
            className="habit-input"
            name="startDate"
            id="startDate"
            type="date"
          />
          {errors.startDate && <div className="error-message">{errors.startDate}</div>}
        </div>

        <div className="date-input">
          <label htmlFor="endDate">Data fine</label>
          <input
            data-required onChange={revalidate}
            className="habit-input"
            name="endDate"
            id="endDate"
            type="date"
          />
          {errors.endDate && <div className="error-message">{errors.endDate}</div>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="targetValue">Obiettivo</label>
        <input
          data-required onChange={revalidate}
          className="habit-input"
          name="targetValue"
          id="targetValue"
          type="number"
          min={1}
          max={999999}
          placeholder="Inserisci il tuo obiettivo"
        />
        {errors.targetValue && <div className="error-message">{errors.targetValue}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="habitRecurrence">Frequenza</label>
        <select
          defaultValue="daily"
          className="habit-input"
          id="habitRecurrence"
          name="habitRecurrence"
        >
          <option value="daily">Giornaliera</option>
          <option value="weekly">Settimanale</option>
          <option value="monthly">Mensile</option>
        </select>
        {errors.habitRecurrence && <div className="error-message">{errors.habitRecurrence}</div>}
      </div>

      <button type="submit" className="habit-button habit-button-primary">Crea</button>
    </form>
  );
}
