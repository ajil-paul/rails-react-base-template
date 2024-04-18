# frozen_string_literal: true

class UserPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      if user.admin? && user.has_permission?("members.view")
        scope.all
      else
        raise Pundit::NotAuthorizedError
      end
    end
  end
end
