class Add < ActiveRecord::Migration[5.1]
  def change
    add_index :likes, [:user_id, :likeable_id], unique: true
  end
end
