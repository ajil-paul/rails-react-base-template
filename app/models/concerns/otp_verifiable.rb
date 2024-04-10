# frozen_string_literal: true

module OtpVerifiable
  extend ActiveSupport::Concern

  MAX_OTP_ATTEMPTS = 5

  included do
    after_create :sent_otp

    def sent_otp
      return unless otp_sendable?

      self.otp = rand(100000..999999)
      self.otp_sent_at = Time.zone.now
      self.otp_attempts = 0
      save!
      send_mail
      end

    def verify_otp(otp)
      return false unless otp_verifiable?

      is_same_otp = self.otp == otp.to_i
      is_same_otp ? self.verified = true : self.otp_attempts += 1
      save!

      is_same_otp
    end

    def otp_verifiable?
      otp_attempts > MAX_OTP_ATTEMPTS && otp_sent_at > 2.minutes.ago || otp_attempts < MAX_OTP_ATTEMPTS
    end

    def otp_attempts_remaining
      MAX_OTP_ATTEMPTS - otp_attempts
    end

    private

      def send_mail
        UserMailer.with(user: self).otp_email.deliver_now
      end

      def otp_sendable?
        self.otp_sent_at.nil? || self.otp_sent_at < 30.seconds.ago
      end
  end
end
