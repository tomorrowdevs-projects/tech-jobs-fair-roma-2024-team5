import BackNavigationLink from "../components/BackNavigationLink/BackNavigationLink";
import HabitFormCreate from "../components/HabitFormCreate/HabitFormCreate";

export default function CreateHabit() {
  return <div className="container">
    <BackNavigationLink href={'/'}></BackNavigationLink>
    <HabitFormCreate></HabitFormCreate>
  </div>
}