# frozen_string_literal: true

class GoalsController < ApplicationController

  def index
    render json: { goals: Goal.all }
  end

  def create
    goal_spec = goal_param
    new_goal = Goals::Create.new.call( goal_spec)

    if new_goal[:success]
      render json: { message: 'Goal stat created successfully' }, status: :created
    else
      render json: { errors: new_goal }, status: :bad_request
    end
  end

  def show
    id = params[:id]
    goal = Goal.find(id)

    render json: { id: goal.id, interval: goal.interval, description: goal.description, goal_unit: goal.target_unit, goal_stats: goal.goal_stats }
  end

  def progress

    id = params[:id]
    goal = Goal.find(id)

    calculator = Goals::ProgressCalculator.new(goal)
    result =  calculator.call

    render json: {progress: result}
  end

  private

  def goal_param
    params.require(:goal_spec).permit(:description, :started_at, :target_date, :target_value, :target_unit, :interval)
  end
end

