from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from datetime import datetime
import os

# Assicurati di avere SQLAlchemy installato
from models import User, Habit, HabitSchedule, HabitCompletion, HabitStatistics, HabitTags, Notification, SharedHabit

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)
session = Session()

# Esempio di popolamento del database
new_user = User(username="example_user", email="user@example.com", password="securepassword")
session.add(new_user)
session.commit()

new_habit = Habit(userId=new_user.id, name="Read Books", description="Read 30 minutes every day", startDate=datetime(2024, 9, 15), targetValue=30)
session.add(new_habit)
session.commit()

new_schedule = HabitSchedule(habitId=new_habit.id, daily=True)
session.add(new_schedule)
session.commit()

new_completion = HabitCompletion(habitScheduleId=new_schedule.id, value=30)
session.add(new_completion)
session.commit()

new_statistics = HabitStatistics(habitId=new_habit.id, endDate=datetime(2024, 10, 15), completionRate=0.9, streak=10)
session.add(new_statistics)
session.commit()

new_tag = HabitTags(tagName="Reading", habitId=new_habit.id)
session.add(new_tag)
session.commit()

new_notification = Notification(title="Reminder", message="Don't forget to read today!", userId=new_user.id)
session.add(new_notification)
session.commit()

new_shared_habit = SharedHabit(habitId=new_habit.id, sharedWithUserId=new_user.id)
session.add(new_shared_habit)
session.commit()

print("Database popolato con successo!")
