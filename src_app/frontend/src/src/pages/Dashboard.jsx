import React, { useState, useEffect } from "react";
import { trpc } from "../lib/trpc";
import HabitCard from "../components/HabitCard/HabitCard";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import Spinner from "../components/Spinner/Spinner";

export default function Dashboard() {
  const [habits, setHabits] = useState();

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      const allHabits = await trpc.habit.find.query({ active: true });
      setHabits(allHabits);
    } catch (ex) {
      console.error(ex);
    }
  };

  const onUpdateProgress = (habit, value) => {
    const habitStatistics = habits.find((h) => h.id === habit.id)
      .habitStatistics[0];

    habitStatistics.streak = Math.max(value, 0);
    habitStatistics.completionRate =
      habitStatistics.streak / Math.max(habit.targetValue);

    setHabits([...habits]);
  };

  const onDelete = (habit) => {
    setHabits(habits.filter((h) => h.id !== habit.id));
  };

  return (
    <div className="dashboard-container container">
      <h1 className="dashboard-title">Le tue abitudini</h1>
      <Link to="/habits/create" className="add-habit-button">
        Aggiungi Abitudine
      </Link>
        {!habits && <div className="d-flex justify-content-center w-100 mx-auto" style={{maxWidth: 200}}>
          <Spinner></Spinner>
          </div>}
      <div className="habits-grid">
        {!!habits && habits.map((habit) => {
          if (!habit.habitStatistics.length) {
            return null;
          }

          return (
            <HabitCard
              key={habit.id}
              onUpdateProgress={onUpdateProgress}
              onDelete={onDelete}
              habit={habit}
            />
          );
        })}
      </div>
      {!!habits && habits.length === 0 && (
        <p className="no-habits-message">Non hai ancora aggiunto abitudini. Inizia ora!</p>
      )}
    </div>
  );
}
