# frozen_string_literal: true

class Goal < ApplicationRecord

  #  add validation the start date can't be  > target date
  belongs_to :user
  has_many :goal_stats

  enum  interval: {daily: 'daily', weekly: 'weekly'}

end
