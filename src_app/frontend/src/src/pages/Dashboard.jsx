import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const Dashboard = () => {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      const response = await fetch('/api/habits');
      const data = await response.json();
      setHabits(data);
    } catch (error) {
      console.error('Errore nel recupero delle abitudini:', error);
    }
  };

  const createNewHabit = async () => {
    try {
      await fetch('/api/habits', { method: 'POST' });
      fetchHabits();
    } catch (error) {
      console.error('Errore nella creazione di una nuova abitudine:', error);
    }
  };

  const getDaysOfWeek = () => {
    const days = ['LUN', 'MAR', 'MER', 'GIO', 'VEN', 'SAB', 'DOM'];
    const today = new Date().getDay();
    const sortedDays = [...days.slice(today), ...days.slice(0, today)];
    return sortedDays.map((day, index) => ({
      day,
      date: new Date(Date.now() + index * 24 * 60 * 60 * 1000).getDate(),
    }));
  };

  return (
    <div className="p-4">
      <Button onClick={createNewHabit} className="mb-4">
        <Plus className="mr-2 h-4 w-4" /> Aggiungi Abitudine
      </Button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {habits.map((habit) => (
          <Card key={habit.id} style={{ backgroundColor: habit.colorCard }}>
            <CardHeader>
              <CardTitle>{habit.nomeObbiettivo}</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={habit.percentualeDiCompletamento} className="mb-4" />
              <div className="flex justify-between">
                {getDaysOfWeek().map(({ day, date }) => (
                  <div
                    key={day}
                    className={`text-center p-2 border ${
                      habit.giorniActions.includes(day) ? 'border-blue-800' : 'border-black'
                    }`}
                  >
                    <div className="font-bold">{day}</div>
                    <div>{date}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;