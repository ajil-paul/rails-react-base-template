# frozen_string_literal: true

class RolePolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      if user.admin? && user.has_permission?("roles.view")
        scope.all
      else
        raise Pundit::NotAuthorizedError
      end
    end
  end
end
