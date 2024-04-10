# frozen_string_literal: true

class Api::V1::BaseController < ApplicationController
  before_action :authenticate_user!
end
