class AddScoreToGraphs < ActiveRecord::Migration[5.2]
  def change
    add_column :graphs, :score, :integer
  end
end
