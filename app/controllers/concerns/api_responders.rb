  # frozen_string_literal: true

  # CommonsBackend

  module ApiResponders
    def render_message(notice_code, status, **context)
      render status:, json: { notice_code: }.merge(context)
    end

    def render_success(**context)
      render_message "thumbs_up", :ok, **context
    end

    def render_error(error, status = :unprocessable_entity, context = {})
      error_message = error
      is_exception = error.kind_of?(StandardError)
      if is_exception
        is_having_record = error.methods.include? "record"
        error_message = is_having_record ? error.record.errors_to_sentence : error.message
      end
      error_message = error_message.first if error_message.is_a?(Array) && error_message.length == 1
      key = error_message.is_a?(Array) ? "errors" : "error"
      render_json({ key => error_message }.merge(context), status)
    end

    def render_notice(notice, context = {})
      render_json({ notice: }.merge(context))
    end

    def render_json(json = {}, status = :ok)
      render status:, json:
    end

    def render_pdf(pdf:, **context)
      if context.key? :disposition
        send_data pdf, **context
      else
        render pdf:, **context
      end
    end
  end
