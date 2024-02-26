# frozen_string_literal: true

class GoalStat < ApplicationRecord

  # TODO: validate reporting_date is not later than target_date

  belongs_to :goal

end
