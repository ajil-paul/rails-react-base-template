# frozen_string_literal: true

class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  skip_before_action :verify_authenticity_token

  def google_oauth2
    user = User.from_google(auth)

    if user.persisted?
      sign_in_and_redirect user, event: :authentication
    else
      redirect_to new_user_session_path
    end
  end

  private

    def auth
      @_auth ||= request.env["omniauth.auth"]
    end
end
