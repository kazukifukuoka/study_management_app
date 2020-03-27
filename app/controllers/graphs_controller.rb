class GraphsController < ApplicationController
  def index
    # gon.user_records = Graph.all
    gon.user_records = Graph.chart_data(current_user)
  end
end
