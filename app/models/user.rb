# frozen_string_literal: true

class User < ApplicationRecord
  include DeviseAuthenticatable
  include OtpVerifiable
  include Permissions

  belongs_to :role

  has_many :permissions, through: :role

  class << self
    def ransackable_attributes(auth_object = nil)
      %w[email first_name last_name email]
    end

    def ransackable_associations(auth_object = nil)
      ["permissions", "role"]
    end
  end
end
