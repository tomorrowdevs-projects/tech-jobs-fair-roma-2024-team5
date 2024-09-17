import Progress from "../Progress/Progress";
import "./HabitCard.css";

export default function HabitCard({ habit }) {
  const { completionRate, streak } = habit.habitStatistics.reduce((a, b) => ({
    completionRate: a.completionRate + b.completionRate,
    streak: a.streak + b.streak,
  }));

  return (
    <div className="w-100 p-2 p-lg-3 rounded-3 habit-card">
      <div className="row">
        <div className="col-4 ">
          <div className="bg-light rounded-3 ratio ratio-4x3"></div>
        </div>
        <div className="col-8">
          <div className="p-lg-4 h-100 d-flex flex-column">
            <div className="text-center fw-bold title">{habit.name}</div>
            <div className="my-auto pb-lg-5">
              <Progress value={completionRate} current={streak} total={habit.targetValue} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
