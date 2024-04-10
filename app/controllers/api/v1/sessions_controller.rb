# frozen_string_literal: true

class Api::V1::SessionsController < Api::V1::BaseController
  skip_before_action :authenticate_user!

  def create
    user = User.find_by(email: user_params[:email])
    if user&.valid_password?(user_params[:password])
      sign_in(user)
      render_success
    else
      render_error(t("session.invalid_login"))
    end
  end

  def destroy
    sign_out(current_user)
    head(:ok)
  end

  private

    def user_params
      params.require(:user).permit(:email, :password)
    end
end
