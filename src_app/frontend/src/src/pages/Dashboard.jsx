import React, { useState, useEffect } from "react";
import { trpc } from "../lib/trpc";
import Progress from "../components/Progress/Progress";
import HabitCard from "../components/HabitCard/HabitCard";
import { Link } from "react-router-dom";
import Button from "../components/Button/Button"; 

export default function Dashboard() {
  /**@type {[Awaited<ReturnType<typeof trpc.habit.find.query>>, any]} */
  const [habits, setHabits] = useState();

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      const allHabits = await trpc.habit.find.query();
      setHabits(allHabits);
    } catch (ex) {
      console.error(ex);
    }
  };

  // const createNewHabit = async () => {
  //   try {
  //     const newHabit = await trpc.habit.create.mutate();
  //     fetchHabits();
  //   } catch (ex) {
  //     console.error(ex);
  //   }
  // };

  // const getDaysOfWeek = () => {
  //   const days = ["LUN", "MAR", "MER", "GIO", "VEN", "SAB", "DOM"];
  //   const today = new Date().getDay();
  //   const sortedDays = [...days.slice(today), ...days.slice(0, today)];
  //   return sortedDays.map((day, index) => ({
  //     day,
  //     date: new Date(Date.now() + index * 24 * 60 * 60 * 1000).getDate(),
  //   }));
  // };

  if (!habits) {
    return <></>
  }

  return (
    <div className="p-4 container">
      <div className="mb-4">
        <Button href='/habits/create'>
          Aggiungi Abitudine
        </Button>

      </div>
      <div className="row g-3">
        {habits.map((habit) => {
          if (!habit.habitStatistics.length) {
            return <></>
          }

          return (
            <div key={habit.id} className="col-12">
              <HabitCard habit={habit}></HabitCard>
            </div>
          );
        })}
      </div>
    </div>
  );
}
