class EditPolyLIkeIndex < ActiveRecord::Migration[5.1]
  def change
    remove_index :likes, column: [:user_id, :likeable_id]

    add_index :likes, [:user_id, :likeable_id, :likeable_type], unique: true

  end
end
