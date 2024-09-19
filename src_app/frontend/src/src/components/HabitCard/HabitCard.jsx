import React, { useCallback, useState } from 'react';
import { trpc } from "../../lib/trpc";
import Progress from "../Progress/Progress";
import './HabitCard.css';
import {debounce} from 'lodash'

export default function HabitCard({ habit, onUpdateProgress, onDelete }) {
  const { completionRate, streak } = habit.habitStatistics.reduce((a, b) => ({
    completionRate: a.completionRate + b.completionRate,
    streak: a.streak + b.streak,
  }));

  const updateRemoteProgress = useCallback(debounce(async (value) => {
    try {
      await trpc.habit.updateProgress.mutate({habitId: habit.id, value})
    } catch(ex) {
      console.error(ex)
    }
  }, 1000), [])

  const updateProgress = async (value) => {
    value = parseInt(value);
    if (isNaN(value)) return;
    updateRemoteProgress(value)
    onUpdateProgress(habit, value)
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
      <div className='d-flex align-items-center '>
      <button onClick={() => updateProgress(streak - 1)} className="habit-button habit-button-primary">
        -
      </button>
        <input 
          type="number" 
          min="0" 
          max="999999" 
          value={streak}
          placeholder="Valore"
          className="habit-input mx-3 input-no-arrows"
          onChange={(e) => (updateProgress(e.target.value))}
        />
        <button onClick={() => updateProgress(streak + 1)} className=" habit-button habit-button-primary">
        +
      </button>
      </div>
      <button onClick={deleteHabit} className="mt-3 habit-button habit-button-secondary">
        Elimina
      </button>
    </div>
  );
}
