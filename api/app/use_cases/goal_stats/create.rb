# frozen_string_literal: true

module GoalStats
  class Create

    def call(params)

      begin
        date = Date.parse(params[:reporting_date]) # parsing the date input to handle weeks interval - will get the first day of the week (starting from monday)
        GoalStat.create(goal_id: params[:goal_id], value: params[:value], reporting_date: date)

        { success: true }
      rescue StandardError => e
        { success: false, error: e.message }
      end

    end

  end
end
