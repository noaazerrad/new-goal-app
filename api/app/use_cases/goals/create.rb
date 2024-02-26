# frozen_string_literal: true

module Goals
  class Create
    # todo remove user
    def call(params)
      Goal.create!(user_id: User.first.id, # added hard coded user id since the user management is not handled
        description: params[:description],
                  started_at: params[:started_at].to_date,
                  target_date: params[:target_date].to_date,
                  target_value: params[:target_value],
                  target_unit: params[:target_unit],
                  interval: params[:interval])

    end
  end
end