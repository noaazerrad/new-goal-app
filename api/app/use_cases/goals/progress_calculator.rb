# frozen_string_literal: true

module Goals
  class ProgressCalculator

    def initialize(goal)
      @goal = goal
    end

    # calculate the current progress average based on the following formula:
    # (( total_reported_values / count_of_reporting) / target_value) * 100
    # used the following example:
    #
    # goal - meditate 60 minutes a week
    # goal stat reporting is weekly:
    # 1 week 30 min
    # 2 week 30 min
    #
    # total_reported_values = 60 (sum of the goal_stats values)
    # count_of_reporting = 2 (number of goal_stats rows )
    # target_value = 60 (original goal's target value)
    # multiply by 100 for percentage
    #((60/2) / 60) * 100
    # current_progress = 50


    def call
      stats = @goal.goal_stats

      return 0 if stats.length == 0

      total_reported_values =  @goal.goal_stats.sum(:value)
      ((total_reported_values.to_f / stats.length)/@goal.target_value)*100
    end

  end
end