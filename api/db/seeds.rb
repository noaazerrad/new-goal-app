# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

user = User.create!(first_name: 'noa', last_name: 'test', email: 'abc@gmail.com')
goal = Goal.create!(user_id: user.id, description: 'read more books',
                    target_date: Date.new(2024,3,20),
                    target_value: 5, target_unit: 'books',
                    started_at: Date.today,interval: 'daily')
goal_stats = GoalStat.create!(goal_id: goal.id, value: 1, reporting_date: Date.yesterday)