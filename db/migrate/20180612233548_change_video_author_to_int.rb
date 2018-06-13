class ChangeVideoAuthorToInt < ActiveRecord::Migration[5.1]
  def change
    remove_column :videos, :author_id
    add_column :videos, :author_id, :integer
  end
end
