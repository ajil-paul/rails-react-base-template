# frozen_string_literal: true

module DeviseAuthenticatable
  extend ActiveSupport::Concern

  OTP_LENGTH = 6

  included do
    devise :database_authenticatable, :registerable,
      :recoverable, :rememberable, :validatable,
      :omniauthable, omniauth_providers: [:google_oauth2]

    def self.from_google(info)
      where(email: info.info.email).first_or_create! do |user|
        user.email = info.info.email
        user.first_name = info.info.first_name
        user.last_name = info.info.last_name
        user.avatar_url = info.info.image
        user.password = Devise.friendly_token[0, 20]
      end
    end
  end
end
