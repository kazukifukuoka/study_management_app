class RemoveIndexToGraphs < ActiveRecord::Migration[5.2]
  def change
    remove_index :study_time, :score, :subject
  end
end
