# frozen_string_literal: true

class GoalStatsController < ApplicationController

  before_action :set_goal

  def index
    @goal_stats = @goal.goal_stats
    render json: @goal_stats
  end

  def create
    goal_stats_spec = goal_spec_param
    new_goal_stats = GoalStats::Create.new.call(goal_stats_spec)

    if new_goal_stats[:success]
      render json: { message: 'Goal stat created successfully' }, status: :created
    else
      render json: { errors: new_goal_stats[:error] }, status: :bad_request
    end
  end

  private

  def set_goal
    @goal = Goal.find(params[:goal_id])
  end

  def goal_spec_param
    params.require(:goal_stat_spec).permit(:goal_id, :value, :reporting_date)
  end
end
