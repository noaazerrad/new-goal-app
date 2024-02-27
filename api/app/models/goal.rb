# frozen_string_literal: true

class Goal < ApplicationRecord

  # TODO: add validations for date checks like:
  # Validate that the started_at date is not later than the target_date
  # validate target_date is not in the past


  belongs_to :user
  has_many :goal_stats

  # currently supporting only two interval options for simplicity
  enum  interval: {daily: 'daily', weekly: 'weekly'}

end
