class AddLikeValue < ActiveRecord::Migration[5.1]
  def change
    add_column :likes, :like_value, :boolean
  end
end
