# frozen_string_literal: true

class CreatePermissions < ActiveRecord::Migration[7.1]
  def change
    create_table :permissions, id: :uuid do |t|
      t.string :name
      t.string :description
      t.string :category

      t.timestamps
    end
  end
end
