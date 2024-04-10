  # frozen_string_literal: true

  # CommonsBackend

  module ApiHelpers
    def full_messages_with_keys_for(errors)
      Hash[errors.messages.keys.map { |key| [key, errors.full_messages_for(key)] }]
    end
  end
