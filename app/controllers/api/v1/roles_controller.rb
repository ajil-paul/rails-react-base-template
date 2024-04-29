# frozen_string_literal: true

class Api::V1::RolesController < Api::V1::BaseController
  def index
    @roles = policy_scope(Role)
  end
end
