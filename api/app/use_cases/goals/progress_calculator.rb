# frozen_string_literal: true

module Goals
  class ProgressCalculator

    def initialize(goal)
      @goal = goal
    end

    # calculate the current progress average based on the following formula:
    #(( total_reported_values / count_of_reporting) / target_value) * 100

    def call
      stats = @goal.goal_stats

      return 0 if stats.length == 0

      total_reported_values =  @goal.goal_stats.sum(:value)
      ((total_reported_values.to_f / stats.length)/@goal.target_value)*100
    end

  end
end