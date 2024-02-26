# frozen_string_literal: true

module GoalStats
  class Create

    def call(params)
      date = Date.parse(params[:reporting_date]) # parsing the date input to handle weeks - will get the first day of the week (starting from monday)
      GoalStat.create(goal_id: params[:goal_id], value: params[:value], reporting_date: date)
    end

  end
end
