# frozen_string_literal: true

module Goals
  class Create

    def call(params)

      begin
        goal = Goal.create!(user_id: User.first.id, # Using a hard-coded user ID for development purposes. User management functionality is not yet implemented.
                     description: params[:description],
                     started_at: params[:started_at].to_date,
                     target_date: params[:target_date].to_date,
                     target_value: params[:target_value],
                     target_unit: params[:target_unit],
                     interval: params[:interval])

        { success: true, goal: goal }
      rescue StandardError => e
        { success: false, error: e.message }

      end

    end
  end
end