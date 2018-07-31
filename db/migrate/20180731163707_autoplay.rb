class Autoplay < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :autoplay, :boolean, default: false
  end
end
