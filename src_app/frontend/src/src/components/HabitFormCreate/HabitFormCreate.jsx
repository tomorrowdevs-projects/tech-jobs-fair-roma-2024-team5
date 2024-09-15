import { trpc } from "../../lib/trpc";
import './HabitFormCreate.css'

export default function HabitFormCreate() {
  const onSubmit = async (e) => {
    e.preventDefault();

    const {
      name,
      description,
      startDate,
      endDate,
      targetValue,
      abitType,
      priority,
    } = e.target.elements;

    try {
      await trpc.habit.create.mutate({
        name: name.value,
        description: description.value,
        startDate: new Date(startDate.value),
        endDate: new Date(endDate.value),
        targetValue: parseInt(targetValue.value) || 0,
        abitType: abitType.value,
        priority: parseInt(priority.value) || 0,
      });

    }
    catch(ex) {
      console.error(ex)
    }
  };

  return (
    <form onSubmit={onSubmit} className="habit-form-create py-5">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          className="form-control"
          name="name"
          id="name"
          type="text"
        ></input>
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          className="form-control"
          name="description"
          id="description"
          type="text"
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="startDate">Start Date</label>
        <input
          className="form-control"
          name="startDate"
          id="startDate"
          type="date"
        ></input>
      </div>
      <div className="form-group">
        <label htmlFor="endDate">End Date</label>
        <input
          className="form-control"
          name="endDate"
          id="endDate"
          type="date"
        ></input>
      </div>
      <div className="form-group">
        <label htmlFor="targetValue">Target Value</label>
        <input
          className="form-control"
          name="targetValue"
          id="targetValue"
          type="date"
        ></input>
      </div>
      <div className="form-group">
        <label htmlFor="abitType">Abit Type</label>
        <input
          className="form-control"
          name="abitType"
          id="abitType"
          type="text"
        ></input>
      </div>
      <div className="form-group">
        <label htmlFor="priority">Priority</label>
        <input
          className="form-control"
          name="priority"
          id="priority"
          type="number"
        ></input>
      </div>

      <button>Create</button>
    </form>
  );
}
