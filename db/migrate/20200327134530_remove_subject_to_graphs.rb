class RemoveSubjectToGraphs < ActiveRecord::Migration[5.2]
  def change
    remove_column :graphs, :subject, :string
  end
end
