# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include ApiExceptions
  include ApiHelpers
  include ApiResponders
end
