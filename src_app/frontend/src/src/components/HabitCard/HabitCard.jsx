import { trpc } from "../../lib/trpc";
import Button from "../Button/Button";
import Progress from "../Progress/Progress";
import "./HabitCard.css";

export default function HabitCard({ habit, onAddCompletion, onDelete }) {
  const { completionRate, streak } = habit.habitStatistics.reduce((a, b) => ({
    completionRate: a.completionRate + b.completionRate,
    streak: a.streak + b.streak,
  }));

  const addCompletion = async (e) => {
    e.preventDefault();

    const {
      completionValue
    } = e.target.elements;

    const value = parseInt(completionValue.value);

    if (isNaN(value) || value <= 0) {
      return;
    }

    try {
      await trpc.habit.addCompletion.mutate({habitId: habit.id, value})
      onAddCompletion(habit, value)
    }
    catch(ex) {
      console.error(ex)
    }

  }

  const deleteHabit = async () => {
    try {
      await trpc.habit.delete.mutate({id: habit.id})
      onDelete(habit)
    }
    catch(ex) {
      console.error(ex)
    }
  }

  return (
    <div className="w-100 p-2 p-lg-3 rounded-3 habit-card">
      <div className="row">
        <div className="col-4 ">
          <div className="bg-light rounded-3 ratio ratio-4x3"></div>
        </div>
        <div className="col-8">
          <div className="p-lg-4 h-100 d-flex flex-column">
            <div className="text-center fw-bold title">{habit.name}</div>
            <div className="flex-1-1 pb-lg-5">
              <Progress
                value={completionRate}
                current={streak}
                total={habit.targetValue}
              />
            </div>
          <form onSubmit={addCompletion}>
            <div className="row">
              <div className="col-12 col-lg-6">
                <input type="number" name="completionValue" id="completionValue"></input>
              </div>
              <div className="col-12 col-lg-6">
                <Button>Add Progress</Button>
              </div>
            </div>
          </form>
              <div className="col-12">
                <Button onClick={deleteHabit}>Delete</Button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
