-- pgsql DDL script
DROP TABLE IF EXISTS shared_habits;
DROP TABLE IF EXISTS notifications;
DROP TABLE IF EXISTS habit_completions;
DROP TABLE IF EXISTS habit_schedule;
DROP TABLE IF EXISTS habits;
DROP TABLE IF EXISTS users;


-- users
CREATE TABLE users (
                       id SERIAL PRIMARY KEY,
                       username VARCHAR(50) UNIQUE NOT NULL,
                       email VARCHAR(100) NOT NULL,
                       password VARCHAR(255) NOT NULL,
                       created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- each user can have multiple habits
CREATE TABLE habits (
                        id SERIAL PRIMARY KEY,
                        user_id INTEGER REFERENCES users(id),
                        name VARCHAR(100) NOT NULL,
                        description VARCHAR(300),
                        start_date DATE NOT NULL,
                        end_date DATE,
                        target_value INTEGER NOT NULL,
                        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- each habit can have multiple schedules (daily, weekly, monthly, specific date)
CREATE TABLE habit_schedule (
                                id SERIAL PRIMARY KEY,
                                habit_id INTEGER NOT NULL REFERENCES habits(id),
                                daily BOOLEAN NOT NULL DEFAULT FALSE,
                                day_of_week INTEGER, -- 1-7
                                day_of_month INTEGER, -- 1-31
                                specific_date DATE,
                                CONSTRAINT check_schedule_type CHECK (
                                    (day_of_week IS NOT NULL AND day_of_month IS NULL AND specific_date IS NULL AND daily IS FALSE) OR
                                    (day_of_week IS NULL AND day_of_month IS NOT NULL AND specific_date IS NULL AND daily IS FALSE) OR
                                    (day_of_week IS NULL AND day_of_month IS NULL AND specific_date IS NOT NULL AND daily IS FALSE) OR
                                    (day_of_week IS NULL AND day_of_month IS NULL AND specific_date IS NULL AND daily IS TRUE)
                                )
);

-- each habit schedule can have multiple completions
CREATE TABLE habit_completions (
                                   id SERIAL PRIMARY KEY,
                                   habit_schedule_id INTEGER REFERENCES habit_schedule(id),
                                   value INTEGER NOT NULL,
                                   completed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- each habit schedule can have multiple notifications
CREATE TABLE notifications (
                               id SERIAL PRIMARY KEY,
                               user_id INTEGER NOT NULL REFERENCES users(id),
                               habit_schedule_id INTEGER REFERENCES habit_schedule(id),
                               title VARCHAR(100) NOT NULL,
                               message VARCHAR(300) NOT NULL,
                               created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- each habit can be shared with multiple users
CREATE TABLE shared_habits (
                               id SERIAL PRIMARY KEY,
                               habit_id INTEGER NOT NULL REFERENCES habits(id),
                               shared_with_user_id INTEGER NOT NULL REFERENCES users(id),
                               created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
