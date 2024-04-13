# frozen_string_literal: true

class User < ApplicationRecord
  include DeviseAuthenticatable
  include OtpVerifiable
  include Permissions

  belongs_to :role

  has_many :permissions, through: :role
end
