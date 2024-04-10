# frozen_string_literal: true

class UserMailer < ApplicationMailer
  def otp_email
    @user = params[:user]
    mail(to: @user.email, subject: "Your OTP is #{ @user.otp}")
  end
end
