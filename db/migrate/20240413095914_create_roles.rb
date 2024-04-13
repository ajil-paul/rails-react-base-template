# frozen_string_literal: true

class CreateRoles < ActiveRecord::Migration[7.1]
  def change
    create_table :roles, id: :uuid do |t|
      t.string :name
      t.string :description
      t.string :kind

      t.timestamps
    end
  end
end
