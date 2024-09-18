import "./Progress.css";

export default function Progress({ value, total, current }) {
  const percentage = value * 100;

  return (
    <div className="progress-bar d-block">
      <div className="d-flex justify-content-between percentages mb-1">
        {!isNaN(current) && <span>{current}</span>}
        <span className="text-body-secondary fs-8">
          {Math.round(percentage)}%
        </span>
        {!isNaN(total) && <span>{total}</span>}
      </div>
      <div className="bg-light rounded-pill overflow-hidden bar">
        <div
          style={{ width: `${percentage}%` }}
          className="bg-success h-100"
        ></div>
      </div>
    </div>
  );
}
