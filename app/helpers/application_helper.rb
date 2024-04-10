# frozen_string_literal: true

module ApplicationHelper
  def user_details
    raw(
      {
        email: current_user.email,
        firstName: current_user.first_name,
        lastName: current_user.last_name,
        isProfileCompleted: current_user.profile_completed?
      }.to_json)
    end
end
