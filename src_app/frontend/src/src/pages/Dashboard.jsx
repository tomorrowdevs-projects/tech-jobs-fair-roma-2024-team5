import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { trpc } from "../lib/trpc";

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

  const getDaysOfWeek = () => {
    const days = ["LUN", "MAR", "MER", "GIO", "VEN", "SAB", "DOM"];
    const today = new Date().getDay();
    const sortedDays = [...days.slice(today), ...days.slice(0, today)];
    return sortedDays.map((day, index) => ({
      day,
      date: new Date(Date.now() + index * 24 * 60 * 60 * 1000).getDate(),
    }));
  };

  return (
    <div className="p-4">
      <Button className="mb-4">
        <Plus className="mr-2 h-4 w-4" /> Aggiungi Abitudine
      </Button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {habits.map((habit) => {
          const stats = habit.habitStatistics[0];

          if (!stats) {
            return <></>
          }

          return (
            <Card key={habit.id} style={{ backgroundColor: habit.colorCard }}>
              <CardHeader>
                <CardTitle>{habit.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={stats.completionRate} className="mb-4" />
                <div className="flex justify-between">
                  {getDaysOfWeek().map(({ day, date }) => (
                    <div
                      key={day}
                      className={`text-center p-2 border ${
                        habit.giorniActions.includes(day)
                          ? "border-blue-800"
                          : "border-black"
                      }`}
                    >
                      <div className="font-bold">{day}</div>
                      <div>{date}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
