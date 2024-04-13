# frozen_string_literal: true

class CreateRolesPermissions < ActiveRecord::Migration[7.1]
  def change
    create_table :roles_permissions, id: :uuid do |t|
      t.references :role, type: :uuid, null: false, foreign_key: true
      t.references :permission, type: :uuid, null: false, foreign_key: true

      t.timestamps
    end
  end
end
