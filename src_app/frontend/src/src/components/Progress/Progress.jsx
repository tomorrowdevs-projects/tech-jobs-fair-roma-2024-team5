import "./Progress.css";

export default function Progress({ value }) {
  return (
    <div className="progress-bar d-block">
      <div className="d-flex justify-content-between percentages mb-1">
        <span className="text-body-secondary fs-8">0%</span>
        <span className="text-body-secondary fs-8">100%</span>
      </div>
      <div className="bg-light rounded-pill overflow-hidden bar">
        <div
          style={{ width: `${value * 100}%` }}
          className="bg-success h-100"
        ></div>
      </div>
    </div>
  );
}
