# frozen_string_literal: true

class Api::V1::UsersController < Api::V1::BaseController
  skip_before_action :authenticate_user!

  before_action :load_user!, only: %i[validate_otp resend_otp]

  def index
    query = User.ransack(filter_params)
    filtered_users = query.result(distinct: true).includes(:role)
    @users = policy_scope(filtered_users)
  end

  def register
    user = User.find_by(email: user_params[:email])
    if user.present?
      return render_error(t("user.already_exists")) if user.verified?

      user.sent_otp
    else
      User.create!(user_params.except(:otp))
    end

    render_success
  end

  def update_profile
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
      params.require(:user).permit(:name, :email, :password, :password_confirmation, :otp).merge(role: Role.standard)
    end

    def profile_params
      params.require(:user).permit(:first_name, :last_name, :phone_number).merge(profile_completed: true)
    end

    def load_user!
      @user = User.find_by(email: user_params[:email])

      render_error(t("user.not_found")) unless @user.present?
    end

    def filter_params
      params.permit(
        [
          :first_name_or_last_name_or_email_cont,
        ])
    end
end
