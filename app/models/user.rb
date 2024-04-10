# frozen_string_literal: true

class User < ApplicationRecord
  include DeviseAuthenticatable
  include OtpVerifiable
end
