# frozen_string_literal: true

class Role < ApplicationRecord
  enum kind: { system: "system", custom: "custom" }

  has_many :users, dependent: :destroy
  has_and_belongs_to_many :permissions, join_table: :roles_permissions

  validates :name, presence: true
  validates :description, presence: true
  validates :kind, presence: true
end
