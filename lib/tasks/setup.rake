# frozen_string_literal: true

desc "drops the db, creates db, migrates db and populates sample data"
task setup: [:environment, "db:drop", "db:create", "db:migrate"] do
  Rake::Task["reset_and_populate_base_data"].invoke if Rails.env.development?
end

desc "Populates sample data after resetting the database"
task reset_and_populate_base_data: [:environment] do
  if Rails.env.production? || Rails.env.staging?
    puts "Skipping deleting and populating sample data"
  else
    Rake::Task["populate_base_data"].invoke
  end
end

desc "Populates seed and sample data"
task populate_base_data: [:environment] do
  create_permissions!
  create_roles!
  create_users!
end

private

def create_permissions!
  puts "Creating permissions..."
  permissions = YAML.safe_load(File.read(Rails.root.join("config", "seeds", "permissions.yml")), symbolize_names: true)
  permissions[:permissions].each do |permission|
    Permission.create(permission.to_h)
  end
end

def create_roles!
  puts "Creating roles..."
  roles = YAML.safe_load(File.read(Rails.root.join("config", "seeds", "roles.yml")), symbolize_names: true)
  roles[:roles].each do |role|
    permissions = role[:permissions]
    role = Role.create!(role.except(:permissions))
    role.permissions = Permission.where(name: permissions)
    role.save!
  end
end

def create_users!
  puts "Creating Oliver..."
  users = YAML.safe_load(File.read(Rails.root.join("config", "seeds", "users.yml")), symbolize_names: true)
  users[:users].each do |user|
    role = Role.find_by!(name: user[:role])
    User.create!(user.except(:role).merge(role: ))
  end
end
