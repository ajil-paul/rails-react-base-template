# frozen_string_literal: true

class Api::V1::UsersController < Api::V1::BaseController
  skip_before_action :authenticate_user!

  before_action :load_user!, only: %i[validate_otp resend_otp]

  def create
    user = User.find_by(email: user_params[:email])
    if user.present?
      return render_error(t("user.already_exists")) if user.verified?

      user.sent_otp
    else
      User.create!(user_params.except(:otp))
    end

    render_success
  end

  def update
    current_user.update!(profile_params)
    render_success
  end

  def validate_otp
    if @user.verify_otp(user_params[:otp])
      sign_in(@user)
      render_success
    else
      render_json(
        { error: t("session.invalid_otp"), attempts_left: @user.otp_attempts_remaining },
        :unprocessable_entity)
    end
  end

  def resend_otp
    @user.sent_otp
    render_success
  end

  private

    def user_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation, :otp)
    end

    def profile_params
      params.require(:user).permit(:first_name, :last_name, :phone_number).merge(profile_completed: true)
    end

    def load_user!
      @user = User.find_by(email: user_params[:email])

      render_error(t("user.not_found")) unless @user.present?
    end
end
