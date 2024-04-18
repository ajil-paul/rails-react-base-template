# frozen_string_literal: true

json.users @users do |user|
  json.extract! user, :id, :email, :first_name, :last_name
  json.role user.role.name
end
