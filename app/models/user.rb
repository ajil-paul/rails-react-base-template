# frozen_string_literal: true

class User < ApplicationRecord
  include DeviseAuthenticatable
  include OtpVerifiable
  include Permissions

  belongs_to :role

  has_many :permissions, through: :role

  class << self
    def ransackable_attributes(auth_object = nil)
      %w[email first_name last_name email full_name]
    end

    def ransackable_associations(auth_object = nil)
      ["permissions", "role"]
    end
  end

  def name
    "#{first_name} #{last_name}"
  end

  ransacker :full_name, formatter: proc { |v| v.mb_chars.downcase.to_s } do |parent|
    Arel::Nodes::NamedFunction.new(
      "LOWER",
      [Arel::Nodes::NamedFunction.new(
        "concat_ws",
        [Arel::Nodes::SqlLiteral.new("' '"), parent.table[:first_name], parent.table[:last_name]])])
  end
end
