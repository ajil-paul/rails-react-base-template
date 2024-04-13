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
  create_oliver!
end

private

def create_permissions!
  puts "Creating permissions..."
  permissions = YAML.safe_load(File.read(Rails.root.join("config", "permissions.yml")), symbolize_names: true)
  permissions[:permissions].each do |permission|
    Permission.create(permission.to_h)
  end
end

def create_roles!
  puts "Creating roles..."
  roles = YAML.safe_load(File.read(Rails.root.join("config", "roles.yml")), symbolize_names: true)
  roles[:roles].each do |role|
    permissions = role[:permissions]
    role = Role.create!(role.except(:permissions))
    role.permissions = Permission.where(name: permissions)
    role.save!
  end
end

def create_oliver!
  puts "Creating Oliver..."
  User.create!(
    first_name: "Oliver",
    last_name: "Smith",
    email: "oliver@example.com",
    password: "Welcome@123",
    role: Role.find_by!(name: "Admin"),
  )
end
