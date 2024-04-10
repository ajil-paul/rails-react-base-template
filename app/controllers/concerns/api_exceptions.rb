# frozen_string_literal: true

require "pundit"

module ApiExceptions
  extend ActiveSupport::Concern

  class ::NotAuthorizedError < StandardError
  end

  included do
    protect_from_forgery

    rescue_from StandardError, with: :handle_api_exception

    def handle_api_exception(exception)
      case exception
      when -> (e) { e.message.include?("PG::") || e.message.include?("SQLite3::") }
        handle_database_level_exception(exception)

      when ::Pundit::NotAuthorizedError
        handle_authorization_error

      when ActionController::ParameterMissing
        log_exception_to_honeybadger(exception)
        render_error(exception, :internal_server_error)

      when ActiveRecord::RecordNotFound
        render_error(t("resource.not_found", resource_name: exception.model), :not_found)

      when ActiveRecord::RecordNotUnique
        render_error(exception)

      when ActiveModel::ValidationError, ActiveRecord::RecordInvalid, ArgumentError
        error_message = exception.message.gsub("Validation failed: ", "")
        render_error(error_message, :unprocessable_entity)

      when ::OAuth2::Error
        redirect_to_logged_out exception.message

      when ::NotAuthorizedError
        redirect_to_sign_in

      else
        handle_generic_exception(exception)
      end
    end

    def handle_database_level_exception(exception)
      handle_generic_exception(exception, :internal_server_error)
    end

    def handle_authorization_error
      render_error(t("authorization.denied"), :forbidden)
    end

    def handle_generic_exception(exception, status = :internal_server_error)
      log_exception_to_honeybadger(exception)
      log_exception(exception)
      error = Rails.env.production? ? t("generic_error") : exception
      render_error(error, status)
    end

    def log_exception(exception)
      [exception.class.to_s, exception.to_s, exception.backtrace.join("\n")].each do |str|
        Rails.env.test? ? puts(str) : Rails.logger.info(str)
      end
    end

    def log_exception_to_honeybadger(exception)
      nil if Rails.env.development? || Rails.env.test?

      #   Honeybadger.notify(exception)
    end

    def redirect_to_logged_out(message)
      flash[:error] = message
      redirect_to logged_out_path, status: :unauthorized
      nil if performed?
    end

    def logged_out_path
      "/logout"
    end

    def redirect_to_sign_in
      redirect_to new_user_session_path, status: :unauthorized
      nil if performed?
    end
  end
end
