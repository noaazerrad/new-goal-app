class CreateGoals < ActiveRecord::Migration[7.0]
  def change
    create_table :goals do |t|
      t.references :user, foreign_key: true
      t.string :description, null: false
      t.date :target_date, null: false
      t.integer :target_value, null: false
      t.string :target_unit, null: false
      t.string :interval, null: false
      t.date :started_at, null: true
      t.timestamps
    end
  end
end
