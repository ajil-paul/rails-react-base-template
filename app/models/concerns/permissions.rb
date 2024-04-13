# frozen_string_literal: true

module Permissions
  extend ActiveSupport::Concern

  included do
    def permission_names
      permissions.pluck(:name)
    end

    def admin?
      role.name == "Admin" && role.system?
    end

    def has_permission?(permission_name)
      permissions.where(name: permission_name).exists?
    end
  end
end
