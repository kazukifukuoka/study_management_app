class RemoveScoreToGraphs < ActiveRecord::Migration[5.2]
  def change
    remove_column :graphs, :score, :integer
  end
end
