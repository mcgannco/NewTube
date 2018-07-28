class AddNightModeToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :night_mode, :boolean, default: false
  end
end
