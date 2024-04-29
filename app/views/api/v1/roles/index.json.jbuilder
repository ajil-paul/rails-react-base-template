# frozen_string_literal: true

json.roles @roles do |role|
  json.extract! role, :id, :name, :description
end
