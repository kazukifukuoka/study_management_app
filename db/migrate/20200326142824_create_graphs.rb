class CreateGraphs < ActiveRecord::Migration[5.2]
  def change
    create_table :graphs do |t|
      t.date :date
      t.integer :study_time
      t.integer :score
      t.string :subject
      t.references :user, foreign_key: true

      t.timestamps
    end
    add_index :graphs, [:user_id, :date], unique: true
  end
end
