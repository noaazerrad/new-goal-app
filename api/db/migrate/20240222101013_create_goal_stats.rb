class CreateGoalStats < ActiveRecord::Migration[7.0]
  def change
    create_table :goal_stats do |t|
      t.references :goal, foreign_key: true
      t.integer :value, null: false
      t.date :reporting_date, null: false
      t.timestamps
    end
  end
end
