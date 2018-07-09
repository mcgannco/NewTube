class AddVideoViewCount < ActiveRecord::Migration[5.1]
  def change
    add_column :videos, :view_count, :integer, default: 0, null: false
  end
end
