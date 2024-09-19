import React from 'react';
import { trpc } from "../../lib/trpc";
import Progress from "../Progress/Progress";
import './HabitCard.css'; // Assicurati di creare questo file CSS

export default function HabitCard({ habit, onAddCompletion, onDelete }) {
  const { completionRate, streak } = habit.habitStatistics.reduce((a, b) => ({
    completionRate: a.completionRate + b.completionRate,
    streak: a.streak + b.streak,
  }));

  const addCompletion = async (e) => {
    e.preventDefault();
    const value = parseInt(e.target.completionValue.value);
    if (isNaN(value) || value <= 0) return;
    try {
      await trpc.habit.addCompletion.mutate({habitId: habit.id, value})
      onAddCompletion(habit, value)
    } catch(ex) {
      console.error(ex)
    }
  }

  const deleteHabit = async () => {
    try {
      await trpc.habit.delete.mutate({id: habit.id})
      onDelete(habit)
    } catch(ex) {
      console.error(ex)
    }
  }

  return (
    <div className="habit-card">
      <h3 className="habit-title">{habit.name}</h3>
      <div className="habit-progress">
        <Progress
          value={completionRate}
          current={streak}
          total={habit.targetValue}
        />
      </div>
      <form onSubmit={addCompletion} className="habit-form">
        <input 
          type="number" 
          name="completionValue" 
          id="completionValue" 
          min="0" 
          max="999999" 
          placeholder="Valore"
          className="habit-input"
        />
        <button type="submit" className="habit-button habit-button-primary">
          Aggiungi
        </button>
      </form>
      <button onClick={deleteHabit} className="habit-button habit-button-secondary">
        Elimina
      </button>
    </div>
  );
}
