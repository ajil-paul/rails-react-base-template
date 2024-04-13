# frozen_string_literal: true

class Role < ApplicationRecord
  enum kind: { system: "system", custom: "custom" }

  has_and_belongs_to_many :permissions

  validate :name, presence: true
  validate :description, presence: true
  validate :kind, presence: true
end
